using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

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
    public async Task<IActionResult> GetAll()
    {
        var readings = await _context.SensorReadings
            .Select(r => new {
                r.Id,
                r.Parameter,
                r.Value,
                r.Timestamp,
                r.PondId
            }).ToListAsync();

        return Ok(readings);
    }

    [HttpGet("{pondId}")]
    public async Task<IActionResult> GetById(int pondId)
    {
        var reading = _context.SensorReadings
            .Where(r => r.PondId == pondId)
            .Select(r => new {
                r.Id,
                r.Parameter,
                r.Value,
                r.Timestamp,
                r.PondId
            }).ToList();

        if (reading == null) return NotFound();
        return Ok(reading);
    }
}
