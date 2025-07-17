using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models;

public class Alert
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey(nameof(Pond))]
    public int PondId { get; set; }

    [ForeignKey(nameof(SensorReading))]
    public int? SensorReadingId { get; set; }

    [Required]
    [StringLength(100)]
    public string Type { get; set; } = default!;

    [Required]
    [StringLength(500)]
    public string Message { get; set; } = default!;

    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    public bool IsAcknowledged { get; set; } = false;

    // Relations
    public virtual Pond Pond { get; set; } = default!;

    public virtual SensorReading? SensorReading { get; set; }
}
