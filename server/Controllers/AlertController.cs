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
    public async Task<IActionResult> GetAll()
    {
        var alerts = await _context.Alerts
            .Select(a => new {
                a.Id,
                a.Parameter,
                a.Value,
                a.Timestamp,
                a.PondId
            }).ToListAsync();

        return Ok(alerts);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var alert = await _context.Alerts
            .Where(a => a.Id == id)
            .Select(a => new {
                a.Id,
                a.Parameter,
                a.Value,
                a.Timestamp,
                a.PondId
            }).FirstOrDefaultAsync();

        if (alert == null) return NotFound();
        return Ok(alert);
    }
}
