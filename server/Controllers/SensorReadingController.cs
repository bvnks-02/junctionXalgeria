using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Models;

[ApiController]
[Route("api/[controller]")]
public class SensorReadingController : ControllerBase
{
    private readonly AppDbContext _context;

    public SensorReadingController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] int? pondId = null, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string? parameter = null)
    {
        if (pageNumber <= 0 || pageSize <= 0)
        {
            return BadRequest("Page number and page size must be greater than zero.");
        }

        IQueryable<SensorReading> query = _context.SensorReadings;

        if (pondId.HasValue)
        {
            query = query.Where(r => r.PondId == pondId.Value);
        }

        if (parameter is not null)
        {
            query = query.Where(r => r.Parameter == parameter);
        }

        var readings = await query
            .OrderByDescending(r => r.Timestamp) // Sort from last created to earliest
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(r => new
            {
                r.Id,
                r.Parameter,
                r.Value,
                r.Timestamp,
                r.PondId
            }).ToListAsync();

        return Ok(readings);
    }

    [HttpGet("grouped-by-parameter")]
    public async Task<IActionResult> GetGroupedByParameter([FromQuery] int? pondId = null)
    {
        var cutoff = DateTime.UtcNow.AddDays(-3);

        var query = _context.SensorReadings
            .Where(r => r.Timestamp >= cutoff);

        if (pondId.HasValue)
        {
            query = query.Where(r => r.PondId == pondId.Value);
        }

        var grouped = await query
            .Select(r => new
            {
                r.Parameter,
                r.Value,
                r.Timestamp,
            })
            .OrderByDescending(r => r.Timestamp)
            .ToListAsync();

        var result = grouped
            .GroupBy(r => r.Parameter)
            .ToDictionary(g => g.Key, g => g.Select(r => new
            {
                r.Value,
                r.Timestamp
            }).ToList());

        return Ok(result);
    }


[HttpGet("latest-by-parameter")]
    public async Task<IActionResult> GetLatestByParameter([FromQuery] int? pondId = null)
    {
        var cutoff = DateTime.UtcNow.AddDays(-3);

        var query = _context.SensorReadings
            .Where(r => r.Timestamp >= cutoff);

        if (pondId.HasValue)
        {
            query = query.Where(r => r.PondId == pondId.Value);
        }

        var grouped = await query
            .Select(r => new
            {
                r.Parameter,
                r.Value,
                r.Timestamp,
            })
            .OrderByDescending(r => r.Timestamp)
            .ToListAsync();

        var result = grouped
            .GroupBy(r => r.Parameter)
            .ToDictionary(g => g.Key, g => g.Select(r => new
            {
                r.Value,
                r.Timestamp
            }).FirstOrDefault());

        return Ok(result);
    }


}
