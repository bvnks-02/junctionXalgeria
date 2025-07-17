using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models;
public class Alert
{
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(50)]
    public string Parameter { get; set; }

    [Required]
    public double Value { get; set; }

    [Required]
    public DateTime Timestamp { get; set; }

    [ForeignKey("Pond")]
    public int PondId { get; set; }

    public Pond Pond { get; set; }
}

