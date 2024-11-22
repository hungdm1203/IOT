import 'package:fire/db/firestore.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class FanControl extends StatefulWidget {
  const FanControl({super.key});

  @override
  State<FanControl> createState() => _FanControlState();
}

class _FanControlState extends State<FanControl> {
  int fanstate = 0;
  String currentState = "OFF";

  FirestoreService firestoreService = FirestoreService();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    firestoreService.listenToFanState((int data) {
      setState(() {
        fanstate = data;
        readfanstate();
      });
    }); // Doc du lieu
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
              backgroundColor: fanstate == 0
                  ? MaterialStateProperty.all<Color>(
                      const Color.fromARGB(255, 132, 208, 233))
                  : MaterialStateProperty.all<Color>(
                      const Color.fromARGB(255, 168, 225, 183)),
            ),
            onPressed: updateFanstate,
            child: //Text(buttonState)
                Container(
              margin: EdgeInsets.all(10),
              child: Row(
                children: [
                  SizedBox(
                    width: 10,
                  ),
                  Image.asset(
                    'image/fann.png',
                    width: 50,
                    height: 50,
                  ),
                  Spacer(),
                  fanstate == 0
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

  void readfanstate() {
    if (fanstate == 0) {
      currentState = "OFF";
    } else {
      currentState = "ON";
    }
  }

  void updateFanstate() {
    if (fanstate == 0) {
      setState(() {
        fanstate = 1;
        currentState = "ON";
        firestoreService.updateToFanState(fanstate);
      });
    } else {
      setState(() {
        fanstate = 0;
        currentState = "OFF";
        firestoreService.updateToFanState(fanstate);
      });
    }
  }
}

class FanShow extends StatefulWidget {
  const FanShow({super.key});

  @override
  State<FanShow> createState() => _FanShowState();
}

class _FanShowState extends State<FanShow> {
  int fanstate = 0;
  String currentState = "OFF";

  bool switchView = false;

  FirestoreService firestoreService = FirestoreService();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    firestoreService.listenToFanState((int data) {
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
            'image/fann.png',
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
      switchView = false;
    } else {
      currentState = "ON";
      switchView = true;
    }
  }
}
