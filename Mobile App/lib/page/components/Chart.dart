import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';

class GaugeChart extends StatelessWidget {
  final double currentValue;
  final double thresholdValue;
  const GaugeChart({required this.currentValue, required this.thresholdValue});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 200,
      width: 200,
      padding: EdgeInsets.all(5),
      decoration: BoxDecoration(
        color: Color.fromARGB(255, 240, 233, 236),
        borderRadius: BorderRadius.circular(15),
      ),
      child: SfRadialGauge(axes: <RadialAxis>[
        RadialAxis(minimum: 0, maximum: thresholdValue, ranges: <GaugeRange>[
          GaugeRange(
              startValue: 0, endValue: thresholdValue / 3, color: Colors.green),
          GaugeRange(
              startValue: thresholdValue / 3,
              endValue: thresholdValue * 2 / 3,
              color: Colors.yellow),
          GaugeRange(
              startValue: thresholdValue * 2 / 3,
              endValue: thresholdValue,
              color: Colors.red)
        ], pointers: <GaugePointer>[
          NeedlePointer(value: currentValue)
        ], annotations: <GaugeAnnotation>[
          GaugeAnnotation(
            widget: Container(
                child: Text('${currentValue.toInt()}',
                    style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w700,
                        color: currentValue < thresholdValue / 3
                            ? Colors.green
                            : currentValue > thresholdValue * 2 / 3
                                ? Colors.red
                                : Colors.yellow))),
            angle: 90,
            positionFactor: 0.5,
          )
        ])
      ]),
    );
  }
}
