using Models;

public interface ISensorAnalysisService
{
    public Task OnNewSensorReading(SensorReading reading);
    
}