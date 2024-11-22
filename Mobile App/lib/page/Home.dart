import 'package:fire/db/firestore.dart';
import 'package:fire/page/components/ChartControl.dart';
import 'package:fire/page/components/FanControl.dart';
import 'package:fire/page/components/PumpControl.dart';
import 'package:fire/page/components/WindowControl.dart';
import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  final FirestoreService firestoreService = FirestoreService();

  String text = "";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Container(
        padding: EdgeInsets.all(15),
        child: Text(
          "Fire Detection System",
          style: TextStyle(
            fontSize: 26,
            fontWeight: FontWeight.bold,
          ),
        ),
      )),
      body: Container(
          decoration: BoxDecoration(color: Colors.white),
          padding: EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.max,
            children: [
              ChartView(),
              SizedBox(
                height: 20,
              ),
              Row(
                children: [
                  Spacer(),
                  FanShow(),
                  SizedBox(
                    width: 15,
                  ),
                  PumpShow(),
                  Spacer()
                ],
              ),
              SizedBox(
                height: 15,
              ),
              WindowShow(),
            ],
          )),
    );
  }
}
