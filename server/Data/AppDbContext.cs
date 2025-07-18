using Microsoft.EntityFrameworkCore;
using Models;

namespace Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<Pond> Ponds => Set<Pond>();
    public DbSet<SensorReading> SensorReadings => Set<SensorReading>();
    public DbSet<Alert> Alerts => Set<Alert>();

    public DbSet<Threshold> Thresholds => Set<Threshold>();

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    var pond = new Pond
    {
        Id = 1,
        Name = "Tilapia Pond A",
    };

    var timestamp = DateTime.UtcNow;

    modelBuilder.Entity<Pond>().HasData(pond);

    // 🔹 Seed realistic thresholds
    var thresholds = new[]
    {
        new Threshold { Id = 1, PondId = 1, Parameter = "Temperature", MinValue = 22, MaxValue = 30 },
        new Threshold { Id = 2, PondId = 1, Parameter = "DissolvedOxygen", MinValue = 5, MaxValue = 10 },
        new Threshold { Id = 3, PondId = 1, Parameter = "pH", MinValue = 6.5, MaxValue = 8.5 },
        new Threshold { Id = 4, PondId = 1, Parameter = "Turbidity", MinValue = 0, MaxValue = 50 }, // NTU
        new Threshold { Id = 5, PondId = 1, Parameter = "Salinity", MinValue = 0, MaxValue = 5 },   // ppt
        new Threshold { Id = 6, PondId = 1, Parameter = "WaterLevel", MinValue = 30, MaxValue = 200 }, // cm
        new Threshold { Id = 7, PondId = 1, Parameter = "FlowRate", MinValue = 0.1, MaxValue = 5 }, // L/s

        // Chemical
        new Threshold { Id = 8, PondId = 1, Parameter = "Ammonia", MinValue = 0, MaxValue = 0.05 },
        new Threshold { Id = 9, PondId = 1, Parameter = "Nitrite", MinValue = 0, MaxValue = 0.1 },
        new Threshold { Id = 10, PondId = 1, Parameter = "Nitrate", MinValue = 0, MaxValue = 50 },

        // Pathogens (example ranges: presence = problem, so max = 0 ideally)
        new Threshold { Id = 11, PondId = 1, Parameter = "AeromonasHydrophila", MinValue = 0, MaxValue = 0 },
        new Threshold { Id = 12, PondId = 1, Parameter = "StreptococcusIniae", MinValue = 0, MaxValue = 0 },
        new Threshold { Id = 13, PondId = 1, Parameter = "FrancisellaOrientalis", MinValue = 0, MaxValue = 0 },
        new Threshold { Id = 14, PondId = 1, Parameter = "Flavobacterium", MinValue = 0, MaxValue = 0 },
        new Threshold { Id = 15, PondId = 1, Parameter = "VibrioSpp", MinValue = 0, MaxValue = 0 },
        new Threshold { Id = 16, PondId = 1, Parameter = "PseudomonasSpp", MinValue = 0, MaxValue = 0 },
        new Threshold { Id = 17, PondId = 1, Parameter = "LactococcusGarvieae", MinValue = 0, MaxValue = 0 },
        new Threshold { Id = 18, PondId = 1, Parameter = "ProvidenciaVermicola", MinValue = 0, MaxValue = 0 },
        new Threshold { Id = 19, PondId = 1, Parameter = "StaphylococcusSpp", MinValue = 0, MaxValue = 0 },
    };

    modelBuilder.Entity<Threshold>().HasData(thresholds);

    // 🔹 Seed zero-value readings for all parameters
    var readings = thresholds.Select((t, i) => new SensorReading
    {
        Id = i + 1,
        PondId = 1,
        Parameter = t.Parameter,
        Value = 0,
        Timestamp = timestamp
    });

    modelBuilder.Entity<SensorReading>().HasData(readings);

    // 🔹 Example alert (temperature too high)
    var alert = new Alert
    {
        Id = 1,
        PondId = 1,
        Timestamp = timestamp,
        Parameter = "Temperature",
        Value = 31
    };

    modelBuilder.Entity<Alert>().HasData(alert);
}

}