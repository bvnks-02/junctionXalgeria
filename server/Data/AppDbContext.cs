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

        // Seed sample pond
        var pond = new Pond
        {
            Id = 1,
            Name = "Tilapia Pond A",
        };

        var threshold = new Threshold
        {
            Id = 1,
            PondId = pond.Id,
            MaxValue = 30, // Max temperature in Celsius
            MinValue = 5,  // Min dissolved oxygen in mg/L
            Parameter = "TemperatureC",
        };
    var timestamp = DateTime.UtcNow;
         modelBuilder.Entity<SensorReading>().HasData(
        new SensorReading { Id = 1, Parameter = "Temperature", Value = 0, Timestamp = timestamp, PondId = 1 },
        new SensorReading { Id = 2, Parameter = "DissolvedOxygen", Value = 0, Timestamp = timestamp, PondId = 1 },
        new SensorReading { Id = 3, Parameter = "pH", Value = 0, Timestamp = timestamp, PondId = 1 },
        new SensorReading { Id = 4, Parameter = "Turbidity", Value = 0, Timestamp = timestamp, PondId = 1 },
        new SensorReading { Id = 5, Parameter = "Salinity", Value = 0, Timestamp = timestamp, PondId = 1 },
        new SensorReading { Id = 6, Parameter = "WaterLevel", Value = 0, Timestamp = timestamp, PondId = 1 },
        new SensorReading { Id = 7, Parameter = "FlowRate", Value = 0, Timestamp = timestamp, PondId = 1 },

        // Chemical
        new SensorReading { Id = 8, Parameter = "Ammonia", Value = 0, Timestamp = timestamp, PondId = 1 },
        new SensorReading { Id = 9, Parameter = "Nitrite", Value = 0, Timestamp = timestamp, PondId = 1 },
        new SensorReading { Id = 10, Parameter = "Nitrate", Value = 0, Timestamp = timestamp, PondId = 1 },

        // Pathogens
        new SensorReading { Id = 11, Parameter = "AeromonasHydrophila", Value = 0, Timestamp = timestamp, PondId = 1 },
        new SensorReading { Id = 12, Parameter = "StreptococcusIniae", Value = 0, Timestamp = timestamp, PondId = 1 },
        new SensorReading { Id = 13, Parameter = "FrancisellaOrientalis", Value = 0, Timestamp = timestamp, PondId = 1 },
        new SensorReading { Id = 14, Parameter = "Flavobacterium", Value = 0, Timestamp = timestamp, PondId = 1 },
        new SensorReading { Id = 15, Parameter = "VibrioSpp", Value = 0, Timestamp = timestamp, PondId = 1 },
        new SensorReading { Id = 16, Parameter = "PseudomonasSpp", Value = 0, Timestamp = timestamp, PondId = 1 },
        new SensorReading { Id = 17, Parameter = "LactococcusGarvieae", Value = 0, Timestamp = timestamp, PondId = 1 },
        new SensorReading { Id = 18, Parameter = "ProvidenciaVermicola", Value = 0, Timestamp = timestamp, PondId = 1 },
        new SensorReading { Id = 19, Parameter = "StaphylococcusSpp", Value = 0, Timestamp = timestamp, PondId = 1 }
    );
        var alert = new Alert
        {
            Id = 1,
            PondId = 1,
            Timestamp = DateTime.UtcNow,
            Parameter = "TemperatureC", 
            Value = 31, // Example alert value
        };

        modelBuilder.Entity<Pond>().HasData(pond);
        modelBuilder.Entity<Threshold>().HasData(threshold);
        modelBuilder.Entity<Alert>().HasData(alert);
    }
}
