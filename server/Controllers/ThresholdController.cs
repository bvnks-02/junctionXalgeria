using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Data;
using Dtos;
using Models;

namespace Controllers;

[ApiController]
[Route("api/[controller]")]
public class ThresholdController : ControllerBase
{
    private readonly AppDbContext _context;

    public ThresholdController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{pondId}")]
    public async Task<ActionResult<ReadThresholdDto>> GetByPond(int pondId)
    {
        var threshold = await _context.Thresholds
            .Where(t => t.PondId == pondId)
            .OrderByDescending(t => t.CreatedAt)
            .FirstOrDefaultAsync();

        if (threshold == null) return NotFound();

        return Ok(new ReadThresholdDto
        {
            Id = threshold.Id,
            MinTemperatureC = threshold.MinTemperatureC,
            MaxTemperatureC = threshold.MaxTemperatureC,
            MinDissolvedOxygenMgL = threshold.MinDissolvedOxygenMgL,
            MaxDissolvedOxygenMgL = threshold.MaxDissolvedOxygenMgL,
            MinPH = threshold.MinPH,
            MaxPH = threshold.MaxPH,
            CreatedAt = threshold.CreatedAt
        });
    }

    [HttpPost]
    public async Task<ActionResult<ReadThresholdDto>> Create(CreateThresholdDto dto)
    {
        var threshold = new Threshold
        {
            PondId = dto.PondId,
            MinTemperatureC = dto.MinTemperatureC,
            MaxTemperatureC = dto.MaxTemperatureC,
            MinDissolvedOxygenMgL = dto.MinDissolvedOxygenMgL,
            MaxDissolvedOxygenMgL = dto.MaxDissolvedOxygenMgL,
            MinPH = dto.MinPH,
            MaxPH = dto.MaxPH,
            CreatedAt = DateTime.UtcNow
        };

        _context.Thresholds.Add(threshold);
        await _context.SaveChangesAsync();

        var result = new ReadThresholdDto
        {
            Id = threshold.Id,
            MinTemperatureC = threshold.MinTemperatureC,
            MaxTemperatureC = threshold.MaxTemperatureC,
            MinDissolvedOxygenMgL = threshold.MinDissolvedOxygenMgL,
            MaxDissolvedOxygenMgL = threshold.MaxDissolvedOxygenMgL,
            MinPH = threshold.MinPH,
            MaxPH = threshold.MaxPH,
            CreatedAt = threshold.CreatedAt
        };

        return CreatedAtAction(nameof(GetByPond), new { pondId = dto.PondId }, result);
    }
}
