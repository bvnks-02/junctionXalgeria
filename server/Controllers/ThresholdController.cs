using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ThresholdController : ControllerBase
{
    private readonly AppDbContext _context;

    public ThresholdController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var thresholds = await _context.Thresholds
            .Select(t => new {
                t.Id,
                t.Parameter,
                t.MinValue,
                t.MaxValue,
                t.PondId
            }).ToListAsync();

        return Ok(thresholds);
    }

    // [HttpGet("{id}")]
    // public async Task<IActionResult> GetById(int id)
    // {
    //     var threshold = await _context.Thresholds
    //         .Where(t => t.Id == id)
    //         .Select(t => new {
    //             t.Id,
    //             t.Parameter,
    //             t.MinValue,
    //             t.MaxValue,
    //             t.PondId
    //         }).FirstOrDefaultAsync();

    //     if (threshold == null) return NotFound();
    //     return Ok(threshold);
    // }
}
