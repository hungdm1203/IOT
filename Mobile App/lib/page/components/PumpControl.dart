import 'package:fire/db/firestore.dart';
import 'package:fire/db/firestore.dart';
import 'package:flutter/material.dart';

class PumpControl extends StatefulWidget {
  const PumpControl({super.key});

  @override
  State<PumpControl> createState() => _PumpControlState();
}

class _PumpControlState extends State<PumpControl> {
  FirestoreService firestoreService = FirestoreService();
  int pumpState = 0;
  String currentState = "OFF";

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    firestoreService.listenToPumpState((int data) {
      setState(() {
        pumpState = data;
        readPumpState();
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          height: 20,
        ),
        ElevatedButton(
            style: ButtonStyle(
              backgroundColor: pumpState == 0
                  ? MaterialStateProperty.all<Color>(
                      const Color.fromARGB(255, 132, 208, 233))
                  : MaterialStateProperty.all<Color>(
                      const Color.fromARGB(255, 168, 225, 183)),
            ),
            onPressed: changeMode,
            child: //Text(buttonState)
                Container(
              margin: EdgeInsets.all(10),
              child: Row(
                children: [
                  SizedBox(
                    width: 10,
                  ),
                  Image.asset(
                    'image/pump.png',
                    width: 50,
                    height: 50,
                  ),
                  Spacer(),
                  pumpState == 0
                      ? Icon(
                          Icons.close,
                        )
                      : Icon(
                          Icons.done,
                        ),
                  Text(currentState),
                ],
              ),
            ))
      ],
    );
  }

  void changeMode() {
    if (pumpState == 0) {
      currentState = "ON";
      pumpState = 1;
      firestoreService.updateToPumpState(pumpState);
    } else {
      currentState = "OFF";
      pumpState = 0;
      firestoreService.updateToPumpState(pumpState);
    }
  }

  void readPumpState() {
    if (pumpState == 1) {
      currentState = "ON";
    } else {
      currentState = "OFF";
    }
  }
}

class PumpShow extends StatefulWidget {
  const PumpShow({super.key});

  @override
  State<PumpShow> createState() => _PumpShowState();
}

class _PumpShowState extends State<PumpShow> {
  int fanstate = 0;
  String currentState = "OFF";

  FirestoreService firestoreService = FirestoreService();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    firestoreService.listenToPumpState((int data) {
      setState(() {
        fanstate = data;
        readfanstate();
      });
    }); // Moi chi doc du lieu
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: fanstate == 1
            ? Color.fromARGB(255, 168, 225, 183)
            : Color.fromARGB(255, 132, 208, 233),
        borderRadius: BorderRadius.circular(20),
      ),
      height: 150,
      width: 150,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Spacer(),
          Image.asset(
            'image/pump.png',
            width: 50,
            height: 50,
          ),
          Spacer(),
          Text(currentState),
        ],
      ),
    );
  }

  void readfanstate() {
    if (fanstate == 0) {
      currentState = "OFF";
    } else {
      currentState = "ON";
    }
  }
}
