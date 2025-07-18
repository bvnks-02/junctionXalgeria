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
    public async Task<IActionResult> Get([FromQuery] int? pondId = null, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
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

        var readings = await query
            .OrderByDescending(r => r.Timestamp) // Sort from last created to earliest
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(r => new {
                r.Id,
                r.Parameter,
                r.Value,
                r.Timestamp,
                r.PondId
            }).ToListAsync();

        return Ok(readings);
    }
}
