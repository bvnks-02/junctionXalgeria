using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class PondController : ControllerBase
{
    private readonly AppDbContext _context;

    public PondController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var ponds = await _context.Ponds
            .Select(p => new {
                p.Id,
                p.Name
            }).ToListAsync();

        return Ok(ponds);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var pond = await _context.Ponds
            .Where(p => p.Id == id)
            .Select(p => new {
                p.Id,
                p.Name
            }).FirstOrDefaultAsync();

        if (pond == null) return NotFound();
        return Ok(pond);
    }
}
