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
            Name = "Tilapia Pond A"
        };
        modelBuilder.Entity<Pond>().HasData(pond);

        var timestamp = DateTime.UtcNow;

        var thresholds = new[]
        {
            // ✅ Ammonia (mg/L)
            new Threshold { Id = 1, PondId = 1, Parameter = "Ammonia", MinValue = 0.0201, MaxValue = 0.05, Severity = "Warning" },
            new Threshold { Id = 2, PondId = 1, Parameter = "Ammonia", MinValue = 0.0501, MaxValue = 999, Severity = "Critical" },

            // ✅ Nitrite (mg/L)
            new Threshold { Id = 3, PondId = 1, Parameter = "Nitrite", MinValue = 0.1001, MaxValue = 0.25, Severity = "Warning" },
            new Threshold { Id = 4, PondId = 1, Parameter = "Nitrite", MinValue = 0.2501, MaxValue = 999, Severity = "Critical" },

            // ✅ Nitrate (mg/L)
            new Threshold { Id = 5, PondId = 1, Parameter = "Nitrate", MinValue = 50.01, MaxValue = 100, Severity = "Warning" },
            new Threshold { Id = 6, PondId = 1, Parameter = "Nitrate", MinValue = 100.01, MaxValue = 999, Severity = "Critical" },

            // ✅ pH
            // pH
            new Threshold { Id = 7, PondId = 1, Parameter = "pH", MinValue = 5.5, MaxValue = 6.0, Severity = "Warning" },
            new Threshold { Id = 8, PondId = 1, Parameter = "pH", MinValue = 0, MaxValue = 5.5, Severity = "Critical" },
            new Threshold { Id = 9, PondId = 1, Parameter = "pH", MinValue = 8.5, MaxValue = 9.0, Severity = "Warning" },
            new Threshold { Id = 10, PondId = 1, Parameter = "pH", MinValue = 9.0, MaxValue = 14.0, Severity = "Critical" },

            // ✅ Water Level (m) → using cm for precision
            new Threshold { Id = 11, PondId = 1, Parameter = "WaterLevel", MinValue = 150, MaxValue = 180, Severity = "Warning" },
            new Threshold { Id = 12, PondId = 1, Parameter = "WaterLevel", MinValue = 0, MaxValue = 150, Severity = "Critical" },
            new Threshold { Id = 13, PondId = 1, Parameter = "WaterLevel", MinValue = 370, MaxValue = 400, Severity = "Warning" },
            new Threshold { Id = 14, PondId = 1, Parameter = "WaterLevel", MinValue = 400.01, MaxValue = double.MaxValue, Severity = "Critical" },

            // ✅ Pathogens — Cq ≤ value means detected
            new Threshold { Id = 15, PondId = 1, Parameter = "StreptococcusIniae", MinValue = 0, MaxValue = 30, Severity = "Critical" },
            new Threshold { Id = 16, PondId = 1, Parameter = "StreptococcusAgalactiae", MinValue = 0, MaxValue = 30, Severity = "Critical" },
            new Threshold { Id = 17, PondId = 1, Parameter = "AeromonasHydrophila", MinValue = 0, MaxValue = 32, Severity = "Critical" },
            new Threshold { Id = 18, PondId = 1, Parameter = "FrancisellaOrientalis", MinValue = 0, MaxValue = 34, Severity = "Critical" },
            new Threshold { Id = 19, PondId = 1, Parameter = "VibrioAnguillarum", MinValue = 0, MaxValue = 28, Severity = "Critical" },
            new Threshold { Id = 20, PondId = 1, Parameter = "TilapiaLakeVirus", MinValue = 0, MaxValue = 35, Severity = "Critical" },
            new Threshold { Id = 21, PondId = 1, Parameter = "Iridovirus", MinValue = 0, MaxValue = 32, Severity = "Critical" },
        };

        modelBuilder.Entity<Threshold>().HasData(thresholds);

        // 🔹 One default sensor reading per unique parameter
        var readings = thresholds
            .GroupBy(t => t.Parameter)
            .Select((group, index) => new SensorReading
            {
                Id = index + 1,
                PondId = 1,
                Parameter = group.Key,
                Value = 0,
                Timestamp = timestamp
            });

        modelBuilder.Entity<SensorReading>().HasData(readings);

        // 🔹 Example alert (temperature > 32)
        modelBuilder.Entity<Alert>().HasData(new Alert
        {
            Id = 1,
            PondId = 1,
            Timestamp = timestamp,
            Parameter = "Temperature",
            Value = 33,
            Severity = "Critical"
        });
    }

}