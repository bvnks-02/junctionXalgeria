using System.ComponentModel.DataAnnotations;

namespace Models;

public class Pond
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = default!;

    [StringLength(200)]
    public string Location { get; set; } = default!;

    public double AreaInSquareMeters { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public string? Notes { get; set; }

    public virtual ICollection<SensorReading> SensorReadings { get; set; } = new List<SensorReading>();

    public virtual ICollection<Alert> Alerts { get; set; } = new List<Alert>();
}
