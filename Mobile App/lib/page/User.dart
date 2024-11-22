import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class User extends StatelessWidget {
  const User({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromARGB(255, 222, 237, 240),
      body: Column(
        children: [
          Row(
            children: [
              Spacer(),
              ElevatedButton(
                onPressed: () {},
                child: Text(
                  'Logout',
                  style: TextStyle(color: Colors.white),
                ),
                style: ButtonStyle(
                  backgroundColor:
                      MaterialStateProperty.all<Color>(Colors.blue),
                ),
              ),
              SizedBox(
                width: 10,
              ),
            ],
          ),
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                SizedBox(
                  height: 30,
                ),
                Image.asset(
                  'image/app.png',
                  height: 70,
                  width: 70,
                ),
                Text(
                  'No Free Fire',
                  style: TextStyle(
                    fontSize: 25,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text('Version 1.3'),
                Text('Design by: tdh'),
                SizedBox(
                  height: 30,
                )
              ],
            ),
          ),
          Container(
              padding: EdgeInsets.all(20),
              color: Colors.white,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Text(
                    "Hệ thống cảnh báo khí gas và lửa            ",
                    style: TextStyle(
                      fontSize: 16,
                    ),
                  ),
                  Text(
                    "Thông báo, điều khiển các ngưỡng khí gas, trạng thái của các thiết bị trong nhà",
                    style: TextStyle(
                      fontSize: 16,
                    ),
                  ),
                  Text(
                    "Hệ thống IOT nhóm 12                                                  ",
                    style: TextStyle(
                      fontSize: 16,
                    ),
                  ),
                  Text(
                    "Phát triển bởi Minh Hiển",
                    style: TextStyle(
                      fontSize: 16,
                    ),
                  )
                ],
              ))
        ],
      ),
    );
  }
}
