using Models;

namespace Dtos;

public class CreatePondDto
{
    public string Name { get; set; } = default!;
    public string Location { get; set; } = default!;
    public double AreaInSquareMeters { get; set; }
    public string? Notes { get; set; }
}

public class ReadPondDto
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public string Location { get; set; } = default!;
    public double AreaInSquareMeters { get; set; }
    public DateTime CreatedAt { get; set; }
}
