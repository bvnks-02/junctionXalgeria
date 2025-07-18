using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class AlertController : ControllerBase
{
    private readonly AppDbContext _context;

    public AlertController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(int pageNumber = 1, int pageSize = 10)
    {
        if (pageNumber < 1 || pageSize < 1)
        {
            return BadRequest("Page number and page size must be greater than 0.");
        }

        var alerts = await _context.Alerts
            .OrderByDescending(a => a.Timestamp)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(a => new
            {
                a.Id,
                a.Parameter,
                a.Value,
                a.Timestamp,
                a.PondId,
                a.Severity
            }).ToListAsync();

        return Ok(alerts);
    }

    // [HttpGet("{id}")]
    // public async Task<IActionResult> GetById(int id)
    // {
    //     var alert = await _context.Alerts
    //         .Where(a => a.Id == id)
    //         .Select(a => new
    //         {
    //             a.Id,
    //             a.Parameter,
    //             a.Value,
    //             a.Timestamp,
    //             a.PondId,
    //             a.Severity
    //         }).FirstOrDefaultAsync();

    //     if (alert == null) return NotFound();
    //     return Ok(alert);
    // }
}
