using Models;

public interface ISensorAnalysisService
{
    public void OnNewSensorReading(SensorReading reading);
    
}