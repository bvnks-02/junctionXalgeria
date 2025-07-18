using System;
using Models;
public class SensorAnalysisService : ISensorAnalysisService
{
    public void OnNewSensorReading(SensorReading reading)
    {
        Console.WriteLine($"[Analysis] {reading.Parameter} = {reading.Value} for Pond {reading.PondId}");
        // add logic: compare with thresholds, trigger alerts, etc.
    }
}
