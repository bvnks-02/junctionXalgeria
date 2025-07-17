using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Data;
using Dtos;
using Models;

namespace Controllers;

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
    public async Task<ActionResult<IEnumerable<ReadPondDto>>> GetAll()
    {
        var ponds = await _context.Ponds
            .Select(p => new ReadPondDto { Id = p.Id, Name = p.Name, Location = p.Location })
            .ToListAsync();
        return Ok(ponds);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ReadPondDto>> GetById(int id)
    {
        var pond = await _context.Ponds.FindAsync(id);
        if (pond == null) return NotFound();

        return new ReadPondDto { Id = pond.Id, Name = pond.Name, Location = pond.Location };
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePondDto dto)
    {
        var pond = new Pond { Name = dto.Name, Location = dto.Location };
        _context.Ponds.Add(pond);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = pond.Id }, null);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var pond = await _context.Ponds.FindAsync(id);
        if (pond == null) return NotFound();
        _context.Ponds.Remove(pond);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
