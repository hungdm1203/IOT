import 'package:fire/db/firestore.dart';
import 'package:flutter/material.dart';

class WindowControl extends StatefulWidget {
  const WindowControl({super.key});

  @override
  State<WindowControl> createState() => _WindowControlState();
}

class _WindowControlState extends State<WindowControl> {
  FirestoreService firestoreService = FirestoreService();
  int windowState = 0;

  String currentState = "OFF";

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    firestoreService.listenToWindowState((int data) {
      setState(() {
        windowState = data;
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
              backgroundColor: windowState == 0
                  ? MaterialStateProperty.all<Color>(
                      const Color.fromARGB(255, 132, 208, 233))
                  : MaterialStateProperty.all<Color>(
                      const Color.fromARGB(255, 168, 225, 183)),
            ),
            onPressed: updateState,
            child: //Text(buttonState)
                Container(
              margin: EdgeInsets.all(10),
              child: Row(
                children: [
                  SizedBox(
                    width: 10,
                  ),
                  Image.asset(
                    'image/window.png',
                    width: 50,
                    height: 50,
                  ),
                  Spacer(),
                  windowState == 0
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

  void updateState() {
    if (windowState == 0) {
      currentState = "ON";
      windowState = 1;
      firestoreService.updateToWindowState(windowState);
    } else {
      currentState = "OFF";
      windowState = 0;
      firestoreService.updateToWindowState(windowState);
    }
  }

  void readPumpState() {
    if (windowState == 1) {
      currentState = "ON";
    } else {
      currentState = "OFF";
    }
  }
}

class WindowShow extends StatefulWidget {
  const WindowShow({super.key});

  @override
  State<WindowShow> createState() => _WindowShowState();
}

class _WindowShowState extends State<WindowShow> {
  int fanstate = 0;
  String currentState = "OFF";

  FirestoreService firestoreService = FirestoreService();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    firestoreService.listenToWindowState((int data) {
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
            'image/window.png',
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
