using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models;

public class SensorReading
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey(nameof(Pond))]
    public int PondId { get; set; }

    public DateTime Timestamp { get; set; }

    public float TemperatureC { get; set; }
    public float DissolvedOxygenMgL { get; set; }
    public float PH { get; set; }

    [StringLength(50)]
    public string? Source { get; set; } // e.g., "sensor", "manual"

    // Relation
    public virtual Pond Pond { get; set; } = default!;
}
