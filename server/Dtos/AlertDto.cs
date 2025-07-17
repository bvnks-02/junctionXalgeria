namespace Dtos;

public class ReadAlertDto
{
    public int Id { get; set; }
    public string Parameter { get; set; }
    public float Value { get; set; }
    public string Severity { get; set; }
    public DateTime TriggeredAt { get; set; }
}
