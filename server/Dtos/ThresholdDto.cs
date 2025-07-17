namespace Dtos;

public class CreateThresholdDto
{
    public int PondId { get; set; }
    public float? MinTemperatureC { get; set; }
    public float? MaxTemperatureC { get; set; }
    public float? MinDissolvedOxygenMgL { get; set; }
    public float? MaxDissolvedOxygenMgL { get; set; }
    public float? MinPH { get; set; }
    public float? MaxPH { get; set; }
}

public class ReadThresholdDto
{
    public int Id { get; set; }
    public float? MinTemperatureC { get; set; }
    public float? MaxTemperatureC { get; set; }
    public float? MinDissolvedOxygenMgL { get; set; }
    public float? MaxDissolvedOxygenMgL { get; set; }
    public float? MinPH { get; set; }
    public float? MaxPH { get; set; }
    public DateTime CreatedAt { get; set; }
}
