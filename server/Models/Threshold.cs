namespace Models;

public class Threshold
{
    public int Id { get; set; }

    public string SensorType { get; set; } = default!; // e.g., "Temperature"

    public double Min { get; set; }
    public double Max { get; set; }

    public int PondId { get; set; }
    public Pond Pond { get; set; } = default!;
}
