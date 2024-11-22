import 'package:firebase_database/firebase_database.dart';

class FirestoreService {
  // get collection of notes
  DatabaseReference ref = FirebaseDatabase.instance.ref('data');

  // read data
  void listenToGasValue(Function(int) onData) {
    ref.child('gasValue').onValue.listen((DatabaseEvent event) {
      if (event.snapshot.exists) {
        int gasValue = event.snapshot.value as int;
        onData(gasValue); // Truyền giá trị gasValue qua callback
      } else {
        onData(0); // Nếu không có dữ liệu thì trả về 0
      }
    });
  }

  void listenToSystemState(Function(int) onData) {
    ref.child('systemState').onValue.listen((DatabaseEvent event) {
      if (event.snapshot.exists) {
        int systemState = event.snapshot.value as int;
        onData(systemState);
      } else {
        onData(0);
      }
    });
  }

  void listenToFireState(Function(int) onData) {
    ref.child('fireState').onValue.listen((DatabaseEvent event) {
      if (event.snapshot.exists) {
        int fireState = event.snapshot.value as int;
        onData(fireState);
      } else {
        onData(0);
      }
    });
  }

  void listenToGasThreshold(Function(int) onData) {
    ref.child('gasThreshold').onValue.listen((DatabaseEvent event) {
      if (event.snapshot.exists) {
        int threshold = event.snapshot.value as int;
        onData(threshold);
      } else {
        onData(0);
      }
    });
  }

  void listenToFanState(Function(int) onData) {
    ref.child('fanState').onValue.listen((DatabaseEvent event) {
      if (event.snapshot.exists) {
        int fanState = event.snapshot.value as int;
        onData(fanState);
      } else {
        onData(0);
      }
    });
  }

  void listenToPumpState(Function(int) onData) {
    ref.child('pumpState').onValue.listen((DatabaseEvent event) {
      if (event.snapshot.exists) {
        int pumpState = event.snapshot.value as int;
        onData(pumpState);
      } else {
        onData(0);
      }
    });
  }

  void listenToWindowState(Function(int) onData) {
    ref.child('windowState').onValue.listen((DatabaseEvent event) {
      if (event.snapshot.exists) {
        int windowState = event.snapshot.value as int;
        onData(windowState);
      } else {
        onData(0);
      }
    });
  }

// Update - write data

  void updateToFanState(int data) {
    ref.update({
      "fanState": data,
    });
  }

  void updateToPumpState(int data) {
    ref.update({
      "pumpState": data,
    });
  }

  void updateToWindowState(int data) {
    ref.update({
      "windowState": data,
    });
  }

  void updateToThreasold(int data) {
    ref.update({
      "gasThreshold": data,
    });
  }

  void updateToSystemState(int data) {
    ref.update({
      "systemState": data,
    });
  }

// Delete
}
