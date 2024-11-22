import 'package:fire/page/components/ChartControl.dart';
import 'package:fire/page/components/FanControl.dart';
import 'package:fire/page/components/PumpControl.dart';
import 'package:fire/page/components/WindowControl.dart';
import 'package:flutter/material.dart';

class Control extends StatelessWidget {
  const Control({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: Center(
          child: Text(
            "Control",
            style: TextStyle(
              fontSize: 26,
              fontWeight: FontWeight.bold,
            ),
          ),
        )),
        body: SizedBox(
          width: MediaQuery.of(context).size.width,
          child: Container(
              decoration: BoxDecoration(
                color: Colors.white,
              ),
              padding: EdgeInsets.all(20),
              child: Column(
                children: [
                  ChartControl(),
                  FanControl(),
                  PumpControl(),
                  WindowControl(),
                ],
              )),
        ));
  }
}
