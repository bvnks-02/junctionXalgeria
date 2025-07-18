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

        var totalItems = await query.CountAsync();

        if (totalItems == 0 && pondId.HasValue)
        {
            return NotFound("No readings found for the specified PondId.");
        }

        var totalPages = (int)System.Math.Ceiling(totalItems / (double)pageSize);

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

        var response = new
        {
            TotalItems = totalItems,
            TotalPages = totalPages,
            CurrentPage = pageNumber,
            PageSize = pageSize,
            Items = readings
        };

        return Ok(response);
    }
}
