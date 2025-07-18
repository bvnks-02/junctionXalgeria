using System;
using System.Linq;
using Models;
using Microsoft.EntityFrameworkCore;
using Data;
using System.Threading.Tasks;

public class SensorAnalysisService : ISensorAnalysisService
{
    private readonly AppDbContext _db;
    private readonly INotificationService _notificationService;

    public SensorAnalysisService(AppDbContext db, INotificationService notificationService)
    {
        _db = db;
        _notificationService = notificationService;
    }

    public async Task OnNewSensorReading(SensorReading reading)
    {
        Console.WriteLine($"[Analysis] {reading.Parameter} = {reading.Value} for Pond {reading.PondId}");

        var threshold = _db.Thresholds
            .AsNoTracking()
            .FirstOrDefault(t =>
                t.PondId == reading.PondId &&
                t.Parameter == reading.Parameter);

        if (threshold == null)
        {
            Console.WriteLine("[Analysis] No threshold defined for this parameter.");
            return;
        }

        if (reading.Value < threshold.MinValue || reading.Value > threshold.MaxValue)
        {
            var alert = new Alert
            {
                Parameter = reading.Parameter,
                Value = reading.Value,
                Timestamp = reading.Timestamp,
                PondId = reading.PondId
            };

            _db.Alerts.Add(alert);
            _db.SaveChanges();

            Console.WriteLine($"[Alert] {reading.Parameter} = {reading.Value} (Threshold: {threshold.MinValue}–{threshold.MaxValue})");

            // TODO: Notify responsible users
            await _notificationService.Notify(alert);
        }
        else
        {
            Console.WriteLine($"[Analysis] {reading.Parameter} = {reading.Value} is within the threshold ({threshold.MinValue}–{threshold.MaxValue})");
        }
    }
}
