using Models;

namespace Dtos;

public class CreateSensorReadingDto
{
    public int PondId { get; set; }
    public DateTime Timestamp { get; set; }
    public float TemperatureC { get; set; }
    public float DissolvedOxygenMgL { get; set; }
    public float PH { get; set; }
    public string? Source { get; set; }
}

public class ReadSensorReadingDto
{
    public int Id { get; set; }
    public DateTime Timestamp { get; set; }
    public float TemperatureC { get; set; }
    public float DissolvedOxygenMgL { get; set; }
    public float PH { get; set; }
    public string? Source { get; set; }
}
