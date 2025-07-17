using Microsoft.EntityFrameworkCore;
using Models;

namespace Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<Pond> Ponds => Set<Pond>();
    public DbSet<SensorReading> SensorReadings => Set<SensorReading>();
    public DbSet<Threshold> Thresholds => Set<Threshold>();
    public DbSet<Alert> Alerts => Set<Alert>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed sample pond
        var pond = new Pond
        {
            Id = 1,
            Name = "Tilapia Pond A",
            Location = "East Station",
            AreaInSquareMeters = 120.5,
            CreatedAt = DateTime.UtcNow
        };

        var threshold = new Threshold
        {
            Id = 1,
            PondId = 1,
            MinTemperatureC = 22,
            MaxTemperatureC = 30,
            MinDissolvedOxygenMgL = 4,
            MaxDissolvedOxygenMgL = 8,
            MinPH = 6.5f,
            MaxPH = 8.5f,
            CreatedAt = DateTime.UtcNow
        };

        var reading = new SensorReading
        {
            Id = 1,
            PondId = 1,
            Timestamp = DateTime.UtcNow,
            TemperatureC = 31,
            DissolvedOxygenMgL = 3.8f,
            PH = 7.2f,
            Source = "simulated"
        };

        var alert = new Alert
        {
            Id = 1,
            PondId = 1,
            SensorReadingId = 1,
            Type = "TemperatureTooHigh",
            Message = "Temperature exceeded threshold (31°C > 30°C)",
            Timestamp = DateTime.UtcNow,
            IsAcknowledged = false
        };

        modelBuilder.Entity<Pond>().HasData(pond);
        modelBuilder.Entity<Threshold>().HasData(threshold);
        modelBuilder.Entity<SensorReading>().HasData(reading);
        modelBuilder.Entity<Alert>().HasData(alert);
    }
}
