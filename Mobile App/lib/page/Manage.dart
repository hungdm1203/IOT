import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class Manage extends StatefulWidget {
  const Manage({super.key});

  @override
  State<Manage> createState() => _ManageState();
}

class _ManageState extends State<Manage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Management')),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SizedBox(
            height: 15,
          ),
          Text(
            'Chọn phòng',
            style: TextStyle(
              fontSize: 18,
            ),
          ),
          SizedBox(
            height: 20,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              OutlinedButton(
                onPressed: () {},
                child: Column(
                  children: [
                    SizedBox(
                      height: 70,
                      width: 70,
                      child: Image.asset('image/bedroom.png'),
                    ),
                    SizedBox(
                      height: 15,
                    ),
                    Text(
                      "Phòng ngủ",
                      style: TextStyle(
                        fontSize: 18, // Kích thước chữ to hơn
                        fontWeight: FontWeight.bold, // Chữ đậm
                        color: Colors.blue, // Màu chữ
                      ),
                    ),
                  ],
                ),
                style: ButtonStyle(
                  padding: MaterialStateProperty.all<EdgeInsets>(
                    EdgeInsets.symmetric(
                        horizontal: 32,
                        vertical: 16), // Tăng kích thước padding
                  ),
                  side: MaterialStateProperty.all<BorderSide>(
                    BorderSide(
                        color: Colors.blue, width: 2), // Viền màu xanh dày hơn
                  ),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                    RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius.circular(12), // Bo góc tròn cho nút
                    ),
                  ),
                  backgroundColor: MaterialStateProperty.all<Color>(
                      Color.fromARGB(255, 244, 216, 216)), // Màu nền của nút
                  overlayColor: MaterialStateProperty.all<Color>(
                      Colors.blue.withOpacity(0.1)), // Màu khi nhấn vào nút
                ),
              ),
              SizedBox(
                width: 15,
              ),
              OutlinedButton(
                onPressed: () {},
                child: Column(
                  children: [
                    SizedBox(
                      height: 70,
                      width: 70,
                      child: Image.asset('image/livingroom.png'),
                    ),
                    SizedBox(
                      height: 15,
                    ),
                    Text(
                      "Phòng khách",
                      style: TextStyle(
                        fontSize: 18, // Kích thước chữ to hơn
                        fontWeight: FontWeight.bold, // Chữ đậm
                        color: Colors.blue, // Màu chữ
                      ),
                    ),
                  ],
                ),
                style: ButtonStyle(
                  padding: MaterialStateProperty.all<EdgeInsets>(
                    EdgeInsets.symmetric(
                        horizontal: 32,
                        vertical: 16), // Tăng kích thước padding
                  ),
                  side: MaterialStateProperty.all<BorderSide>(
                    BorderSide(
                        color: Colors.blue, width: 2), // Viền màu xanh dày hơn
                  ),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                    RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius.circular(12), // Bo góc tròn cho nút
                    ),
                  ),
                  backgroundColor: MaterialStateProperty.all<Color>(
                      Color.fromARGB(255, 244, 216, 216)), // Màu nền của nút
                  overlayColor: MaterialStateProperty.all<Color>(
                      Colors.blue.withOpacity(0.1)), // Màu khi nhấn vào nút
                ),
              ),
            ],
          )
        ],
      ),
    );
  }
}
