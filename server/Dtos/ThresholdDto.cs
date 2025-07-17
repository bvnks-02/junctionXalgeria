namespace Dtos;

public class ThresholdDto
{
    public int Id { get; set; }

    public string SensorType { get; set; } = default!;

    public double Min { get; set; }
    public double Max { get; set; }

    public int PondId { get; set; }
}
