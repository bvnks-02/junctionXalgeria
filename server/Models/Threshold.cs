using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models;

public class Threshold
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey(nameof(Pond))]
    public int PondId { get; set; }

    public float? MinTemperatureC { get; set; }
    public float? MaxTemperatureC { get; set; }

    public float? MinDissolvedOxygenMgL { get; set; }
    public float? MaxDissolvedOxygenMgL { get; set; }

    public float? MinPH { get; set; }
    public float? MaxPH { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Relation
    public virtual Pond Pond { get; set; } = default!;
}
