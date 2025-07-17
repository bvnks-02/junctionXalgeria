using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Data;
using Dtos;
using Models;

namespace Controllers;

[ApiController]
[Route("api/[controller]")]
public class SensorReadingsController : ControllerBase
{
    private readonly AppDbContext _context;

    public SensorReadingsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<ReadSensorReadingDto>> Create(CreateSensorReadingDto dto)
    {
        var pond = await _context.Ponds.FindAsync(dto.PondId);
        if (pond == null)
        {
            return NotFound($"Pond with ID {dto.PondId} not found.");
        }

        var reading = new SensorReading
        {
            PondId = dto.PondId,
            Timestamp = dto.Timestamp,
            TemperatureC = dto.TemperatureC,
            DissolvedOxygenMgL = dto.DissolvedOxygenMgL,
            PH = dto.PH,
            Source = dto.Source
        };

        _context.SensorReadings.Add(reading);
        await _context.SaveChangesAsync();

        var result = new ReadSensorReadingDto
        {
            Id = reading.Id,
            Timestamp = reading.Timestamp,
            TemperatureC = reading.TemperatureC,
            DissolvedOxygenMgL = reading.DissolvedOxygenMgL,
            PH = reading.PH,
            Source = reading.Source
        };

        return CreatedAtAction(nameof(GetById), new { id = reading.Id }, result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ReadSensorReadingDto>> GetById(int id)
    {
        var reading = await _context.SensorReadings.FindAsync(id);
        if (reading == null)
        {
            return NotFound();
        }

        var dto = new ReadSensorReadingDto
        {
            Id = reading.Id,
            Timestamp = reading.Timestamp,
            TemperatureC = reading.TemperatureC,
            DissolvedOxygenMgL = reading.DissolvedOxygenMgL,
            PH = reading.PH,
            Source = reading.Source
        };

        return Ok(dto);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ReadSensorReadingDto>>> GetAll()
    {
        var list = await _context.SensorReadings
            .Select(reading => new ReadSensorReadingDto
            {
                Id = reading.Id,
                Timestamp = reading.Timestamp,
                TemperatureC = reading.TemperatureC,
                DissolvedOxygenMgL = reading.DissolvedOxygenMgL,
                PH = reading.PH,
                Source = reading.Source
            })
            .ToListAsync();

        return Ok(list);
    }
}
