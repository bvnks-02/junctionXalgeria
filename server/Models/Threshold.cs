using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models;
public class Threshold
{
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(50)]
    public string Parameter { get; set; }

    [Required]
    public double MaxValue { get; set; }
    [Required]
    public double MinValue { get; set; }

    [Required]
    public string Severity { get; set; } // "Warning", "Critical", etc.

    [ForeignKey("Pond")]
    public int PondId { get; set; }

    public Pond Pond { get; set; }
}

