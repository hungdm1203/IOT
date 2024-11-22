#include <LiquidCrystal.h>
#include <WiFi.h>
#include <EEPROM.h>
#include <ESP32Servo.h>
#include <FirebaseESP32.h>
#include <addons/RTDBHelper.h>

// Cấu hình WiFi
#define WIFI_SSID "Galaxy A55 5G"
#define WIFI_PASSWORD "12345678"

// Cấu hình trên Firebase
#define DATABASE_URL "fir-demo-e6b12-default-rtdb.asia-southeast1.firebasedatabase.app"
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Màn hình LCD chân RS, Enable, D4, D5, D6, D7
LiquidCrystal lcd(15, 13, 12, 14, 27, 26);

// Khai báo chân các nút
const int buttonMenuPin = 5;      
const int buttonUpPin = 19;       
const int buttonDownPin = 18;    
const int buttonWindowPin = 21;


// Khai báo chân các cảm biến, servo & relay
const int mq2Pin = 35;
const int flameSensorPin = 34;
const int buzzerPin = 23;
const int servo1Pin = 33;
const int servo2Pin = 25;
const int relay1Pin = 22;
const int relay2Pin = 32;

// Trạng thái quạt, máy bơm, cửa
#define ON 1
#define OFF 0
int fanState;
int pumpState;
int windowState;

// Trạng thái hệ thống
#define AUTO 0
#define MANUAL 1
int systemState;

// Các biến sử dụng
int gasThreshold; // Ngưỡng khí gas
int gasValue, mhir;

// Khởi tạo Servo
Servo servo1;
Servo servo2;

// Màn hình chính
void MainScreen() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("HE THONG AN TOAN"); 
  lcd.setCursor(0, 1);
  lcd.print("GAS: ");
  lcd.setCursor(5, 1);
  lcd.print(analogRead(mq2Pin));
}

// Màn hình cảnh báo
void WarningDisplay() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("     WARNING    ");
}

void gasDetection() {
  lcd.setCursor(2, 1);
  lcd.print("GAS LEAKAGE");
}

void fireDetection() {
  lcd.setCursor(0, 1);
  lcd.print(" FIRE DETECTION ");
}

int readGasThreshold() {
  if(Firebase.getInt(fbdo, "/data/gasThreshold")) {
    int temp = fbdo.intData();
    Serial.print("Gas threshold allowed: ");
    Serial.println(temp);
    return temp;
  } else {
    Serial.println("Error while fetching data from Firebase");
    return 2000;
  }
}

void sendValue(int value, String path) {
  if (Firebase.setInt(fbdo, path, value)) {
    Serial.println("Successfully sent value to Firebase");
  } else {
    Serial.println("Failed to send value to Firebase");
  }
}

// Hàm lưu giá trị ngưỡng khí gas vào EEPROM
void saveGasThresholdToEEPROM(int threshold) {
  EEPROM.put(0, threshold);  // Lưu giá trị vào địa chỉ 0
  EEPROM.commit();           // Ghi thay đổi vào EEPROM
  Serial.println("Gas threshold saved to EEPROM");
}

// Hàm đọc giá trị ngưỡng khí gas từ EEPROM
int readGasThresholdFromEEPROM() {
  int threshold;
  EEPROM.get(0, threshold);  // Đọc giá trị từ địa chỉ 0
  Serial.print("Gas threshold read from EEPROM: ");
  Serial.println(threshold);
  return threshold;
}

void setup() {
  Serial.begin(115200);
  
  lcd.begin(16, 2);
  pinMode(buttonMenuPin, INPUT);
  pinMode(buttonUpPin, INPUT);
  pinMode(buttonDownPin, INPUT);
  pinMode(buttonWindowPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(relay1Pin, OUTPUT);
  pinMode(relay2Pin, OUTPUT);
  pinMode(flameSensorPin, INPUT_PULLUP);
  pinMode(mq2Pin, INPUT);

  Serial.print("Connecting to WIFI...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi Connected.");
  Serial.print("IP address: ");
  Serial.print(WiFi.localIP());
  Serial.println();

  config.database_url = DATABASE_URL;
  config.signer.test_mode = true;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  EEPROM.begin(512);
  gasThreshold = readGasThresholdFromEEPROM();
  servo1.attach(servo1Pin);
  servo2.attach(servo2Pin);
  window_close();
  systemState = AUTO;
}

void loop() {

  int firebaseThreshold = readGasThreshold();
  if (firebaseThreshold != gasThreshold) {
    gasThreshold = firebaseThreshold;
    saveGasThresholdToEEPROM(gasThreshold);
  }

  gasValue = analogRead(mq2Pin);
  mhir = digitalRead(flameSensorPin);
  Serial.print("Gas: ");
  Serial.println(gasValue);
  sendValue(gasValue, "/data/gasValue");
  sendValue(mhir, "/data/fireState");
  Firebase.getInt(fbdo, "/data/systemState");
  systemState = fbdo.intData();
  
  // Hệ thống ở chế độ điều chỉnh
  if(systemState == MANUAL) {
    Firebase.getInt(fbdo, "/data/fanState");
    fanState = fbdo.intData();
    Firebase.getInt(fbdo, "/data/pumpState");
    pumpState = fbdo.intData();
    Firebase.getInt(fbdo, "/data/windowState");
    windowState = fbdo.intData();
    if (fanState == ON) {
      digitalWrite(relay1Pin, HIGH);
    } else {
      digitalWrite(relay1Pin, LOW);
    }
    if (pumpState == ON) {
      digitalWrite(relay2Pin, HIGH);
    } else {
      digitalWrite(relay2Pin, LOW);
    }
    if (windowState == ON) {
      servo1.attach(servo1Pin);
      servo2.attach(servo2Pin);
      servo1.write(0);
      servo2.write(180);
      delay(50);
      servo1.detach();
      servo2.detach();
    } else {
      servo1.attach(servo1Pin);
      servo2.attach(servo2Pin);
      servo1.write(90);
      servo2.write(90);
      delay(50);
      servo1.detach();
      servo2.detach();
    }
    if (gasValue > gasThreshold && mhir == 1) { //Có gas, không có lửa
      buz_off();
      lcd.clear();
      WarningDisplay();
      gasDetection();
      buz_on();
    } else if (gasValue > gasThreshold && mhir == 0) { //Có cả gas và lửa
      buz_off();
      lcd.clear();
      WarningDisplay();
      lcd.setCursor(0, 1);
      lcd.print("   GAS & FIRE   ");
      buz_on();
    } else if (gasValue <= gasThreshold && mhir == 0) { //Không có gas, có lửa
      buz_off();
      lcd.clear();
      WarningDisplay();
      fireDetection();
      buz_on();
    }
    else if (gasValue <= gasThreshold && mhir == 1) { //Môi trường an toàn
      MainScreen();
      buz_off();
    }
  } else {
    if (gasValue > gasThreshold && mhir == 1) { //Có gas, không có lửa
      buz_off();
      lcd.clear();;
      WarningDisplay();
      gasDetection();
      buz_on();
      relay1_on(); relay2_off(); //Bật quạt, tắt máy bơm
      window_open();
    } else if (gasValue > gasThreshold && mhir == 0) { //Có cả gas và lửa
      buz_off();
      lcd.clear();
      WarningDisplay();
      lcd.setCursor(0, 1);
      lcd.print("   GAS & FIRE   ");
      buz_on();
      relay1_off(); relay2_on(); // Tắt quạt, bật máy bơm
      window_open();
    } else if (gasValue <= gasThreshold && mhir == 0) { //Không có gas, có lửa
      buz_off();
      lcd.clear();
      WarningDisplay();
      fireDetection();
      buz_on();
      relay1_off(); relay2_on(); // Tắt quạt, bật máy bơm
      window_open();
    }
    else if (gasValue <= gasThreshold && mhir == 1) { //Môi trường an toàn
      buz_off();
      relay1_off(); relay2_off();
      window_close();
      MainScreen();
    }
  }
  delay(1000);
}


/*================Các hàm điều khiển đầu OUT===================*/
void relay1_on() {     // Bật quạt                       
  digitalWrite(relay1Pin, HIGH);
  Firebase.setInt(fbdo, "/data/fanState", ON);
}
void relay1_off() {   // Tắt quạt
  digitalWrite(relay1Pin, LOW);
  Firebase.setInt(fbdo, "/data/fanState", OFF);
}
void relay2_on() {    // Bật bơm
  digitalWrite(relay2Pin, HIGH);
  Firebase.setInt(fbdo, "/data/pumpState", ON);
}
void relay2_off() {   // Tắt bơm
  digitalWrite(relay2Pin, LOW);
  Firebase.setInt(fbdo, "/data/pumpState", OFF);
}

void window_open() {
  Firebase.setInt(fbdo, "/data/windowState", ON);
  servo1.attach(servo1Pin);
  servo2.attach(servo2Pin);
  servo1.write(0);
  servo2.write(180);
  delay(50);
  servo1.detach();
  servo2.detach();
}

void window_close() {
  Firebase.setInt(fbdo, "/data/windowState", OFF);
  servo1.attach(servo1Pin);
  servo2.attach(servo2Pin);
  servo1.write(90);
  servo2.write(90);
  delay(50);
  servo1.detach();
  servo2.detach();
}

void buz_on() {
  digitalWrite(buzzerPin, HIGH);             
}
void buz_off() {
  digitalWrite(buzzerPin, LOW);             
}