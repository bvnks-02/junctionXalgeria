using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models;

public class Pond
{
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; }

    public ICollection<SensorReading> SensorReadings { get; set; }
    public ICollection<Threshold> Thresholds { get; set; }
    public ICollection<Alert> Alerts { get; set; }
}
