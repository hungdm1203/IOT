import 'package:fire/db/firestore.dart';
import 'package:fire/page/components/Chart.dart';
import 'package:flutter/material.dart';

class ChartView extends StatefulWidget {
  const ChartView({super.key});

  @override
  State<ChartView> createState() => _ChartViewState();
}

class _ChartViewState extends State<ChartView> {
  FirestoreService firestoreService = FirestoreService();
  int thresholdValue = 100;
  int currentValue = 0;
  int systemState = 0;
  int fireState = 0;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    firestoreService.listenToGasValue((int data) {
      setState(() {
        currentValue = data;
      });
    });
    firestoreService.listenToGasThreshold((int data) {
      setState(() {
        thresholdValue = data;
      });
    });
    firestoreService.listenToFireState((int data) {
      setState(() {
        fireState = data;
      });
    });
    firestoreService.listenToSystemState((int data) {
      setState(() {
        systemState = data;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Color.fromARGB(255, 166, 154, 222),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          GaugeChart(
              currentValue: currentValue.toDouble(),
              thresholdValue: thresholdValue.toDouble()),
          SizedBox(height: 15),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Hệ thống: ', style: TextStyle(fontSize: 18)),
              currentValue > thresholdValue && fireState == 0
                  ? Text(
                      'Nguy hiểm',
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.red,
                      ),
                    )
                  : currentValue < thresholdValue && fireState == 0 // có lửa
                      ? Text(
                          'Có lửa',
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.red,
                          ),
                        )
                      : currentValue > thresholdValue &&
                              fireState == 1 // có gas
                          ? Text(
                              'Gas vượt ngưỡng',
                              style: TextStyle(
                                fontSize: 18,
                                color: Colors.red,
                              ),
                            )
                          : Text(
                              'An toàn',
                              style: TextStyle(
                                fontSize: 18,
                                color: Colors.yellow,
                              ),
                            ),
            ],
          ),
        ],
      ),
    );
  }
}

class ChartControl extends StatefulWidget {
  const ChartControl({super.key});

  @override
  State<ChartControl> createState() => _ChartControlState();
}

class _ChartControlState extends State<ChartControl> {
  FirestoreService firestoreService = FirestoreService();
  int thresholdValue = 100;
  int currentValue = 0;
  int systemState = 0;
  int fireState = 0;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    firestoreService.listenToGasValue((int data) {
      setState(() {
        currentValue = data;
      });
    });
    firestoreService.listenToGasThreshold((int data) {
      setState(() {
        thresholdValue = data;
      });
    });
    firestoreService.listenToFireState((int data) {
      setState(() {
        fireState = data;
      });
    });
    firestoreService.listenToSystemState((int data) {
      setState(() {
        systemState = data;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final TextEditingController _controller = TextEditingController();
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Color.fromARGB(255, 166, 154, 222),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          GaugeChart(
              currentValue: currentValue.toDouble(),
              thresholdValue: thresholdValue.toDouble()),

          SizedBox(height: 10),
          // Hiển thị giá trị
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(
                width: 15,
              ),
              Text(
                'Giá trị ngưỡng: $thresholdValue',
                style: TextStyle(fontSize: 18),
              ),
              SizedBox(
                width: 10,
              ),
              ElevatedButton(
                  onPressed: () {
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: Text('Thay đổi giá trị ngưỡng!'),
                          content: Row(
                            children: [
                              Expanded(
                                child: TextField(
                                  controller: _controller,
                                  decoration: InputDecoration(
                                    hintText: 'Điền giá trị ngưỡng',
                                  ),
                                  keyboardType: TextInputType.number,
                                ),
                              ),
                            ],
                          ),
                          actions: <Widget>[
                            TextButton(
                              child: Text('Hủy'),
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                            ),
                            TextButton(
                              child: Text('Lưu'),
                              onPressed: () {
                                int? number = int.tryParse(_controller.text);
                                if (number != null) {
                                  firestoreService.updateToThreasold(number);
                                  Navigator.of(context).pop();
                                } else {
                                  Navigator.of(context).pop();
                                }
                              },
                            ),
                          ],
                        );
                      },
                    );
                  },
                  style: ButtonStyle(
                    backgroundColor:
                        MaterialStateProperty.all<Color>(Colors.white60),
                  ),
                  child: Text("Set")),
            ],
          ),

          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Hệ thống: ', style: TextStyle(fontSize: 18)),
              currentValue > thresholdValue && fireState == 0
                  ? Text(
                      'Nguy hiểm',
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.red,
                      ),
                    )
                  : currentValue < thresholdValue && fireState == 0 // có lửa
                      ? Text(
                          'Có lửa',
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.red,
                          ),
                        )
                      : currentValue > thresholdValue &&
                              fireState == 1 // có gas
                          ? Text(
                              'Gas vượt ngưỡng',
                              style: TextStyle(
                                fontSize: 18,
                                color: Colors.red,
                              ),
                            )
                          : Text(
                              'An toàn',
                              style: TextStyle(
                                fontSize: 18,
                                color: Colors.yellow,
                              ),
                            ),
            ],
          ),

          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Trạng thái: ',
                style: TextStyle(
                  fontSize: 18,
                ),
              ),
              SizedBox(
                width: 5,
              ),
              OutlinedButton(
                onPressed: () {
                  if (systemState == 0)
                    firestoreService.updateToSystemState(1);
                  else
                    firestoreService.updateToSystemState(0);
                },
                child: systemState == 0 ? Text("Manual") : Text("Auto"),
              )
            ],
          ),
        ],
      ),
    );
  }
}
