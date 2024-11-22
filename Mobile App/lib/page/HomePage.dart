import 'package:fire/page/Control.dart';
import 'package:fire/page/Home.dart';
import 'package:fire/page/Manage.dart';
import 'package:fire/page/User.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class HomePage extends StatefulWidget {
  static final List<Widget> _pages = <Widget>[
    Home(),
    Control(),
    Manage(),
    User(),
  ];

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    return Scaffold(
      body: SafeArea(
        child: HomePage._pages[selectedIndex],
      ),
      bottomNavigationBar: BottomNavigationBar(
        // type: BottomNavigationBarType.fixed,
        currentIndex: selectedIndex,
        onTap: (index) {
          selectedIndex = index;
          setState(() {});
        },
        items: const [
          BottomNavigationBarItem(
              icon: Icon(
                Icons.home,
              ),
              label: 'Home'),
          BottomNavigationBarItem(
              icon: Icon(
                Icons.settings_applications_outlined,
              ),
              label: "Control"),
          BottomNavigationBarItem(icon: Icon(Icons.settings), label: 'manage'),
          BottomNavigationBarItem(
              icon: Icon(
                Icons.person,
              ),
              label: 'About'),
        ],

        selectedItemColor:
            const Color.fromARGB(255, 45, 40, 40), // Màu khi được chọn
        unselectedItemColor: const Color.fromARGB(86, 83, 79, 79),
        selectedLabelStyle:
            const TextStyle(color: Color.fromARGB(255, 45, 40, 40)),
        unselectedLabelStyle: const TextStyle(
          color: Color.fromARGB(86, 83, 79, 79),
        ),
        showUnselectedLabels: true,
      ),
    );
  }
}
