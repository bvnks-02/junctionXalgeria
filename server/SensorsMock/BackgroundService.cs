using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Models;
using Data;

public class SensorSimulationWorker : BackgroundService
{
    private readonly IServiceProvider _services;
    private readonly Random _random = new();

    public SensorSimulationWorker(IServiceProvider services)
    {
        _services = services;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var analysis = scope.ServiceProvider.GetRequiredService<ISensorAnalysisService>();

            var pondIds = db.Ponds.Select(p => p.Id).ToList();
            foreach (var pondId in pondIds)
            {
                var parameters = new[] {
                    "Temperature", "DissolvedOxygen", "pH", "Turbidity", "Salinity", "WaterLevel", "FlowRate",
                    "Ammonia", "Nitrite", "Nitrate",
                    "AeromonasHydrophila", "StreptococcusIniae", "FrancisellaOrientalis", "Flavobacterium", "VibrioSpp",
                    "PseudomonasSpp", "LactococcusGarvieae", "ProvidenciaVermicola", "StaphylococcusSpp"
                };

                foreach (var param in parameters)
                {
                    var value = GenerateRandomValue(param);
                    var reading = new SensorReading
                    {
                        Parameter = param,
                        Value = value,
                        Timestamp = DateTime.UtcNow,
                        PondId = pondId
                    };

                    db.SensorReadings.Add(reading);
                    analysis.OnNewSensorReading(reading);
                }
            }

            await db.SaveChangesAsync(stoppingToken);

            await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken); // configurable interval
        }
    }

    private double GenerateRandomValue(string parameter)
    {
        return parameter switch
        {
            "Temperature" => _random.NextDouble() * 10 + 20, // 20–30 °C
            "pH" => _random.NextDouble() * 2 + 6,             // 6–8
            "DissolvedOxygen" => _random.NextDouble() * 10,
            _ => _random.NextDouble() * 100
        };
    }
}
