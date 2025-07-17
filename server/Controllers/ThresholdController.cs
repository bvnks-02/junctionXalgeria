using Microsoft.AspNetCore.Mvc;
using Data;
using Dtos;
using Models;

namespace server.Controllers;

[ApiController]
[Route("api/thresholds")]
public class ThresholdController : ControllerBase
{
    private readonly AppDbContext _context;

    public ThresholdController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{pondId}")]
    public IActionResult GetByPond(int pondId)
    {
        var thresholds = _context.Thresholds
            .Where(t => t.PondId == pondId)
            .Select(t => new ThresholdDto
            {
                Id = t.Id,
                SensorType = t.SensorType,
                Min = t.Min,
                Max = t.Max,
                PondId = t.PondId
            })
            .ToList();

        return Ok(thresholds);
    }

    [HttpPost]
    public IActionResult Create(ThresholdDto dto)
    {
        var threshold = new Threshold
        {
            SensorType = dto.SensorType,
            Min = dto.Min,
            Max = dto.Max,
            PondId = dto.PondId
        };

        _context.Thresholds.Add(threshold);
        _context.SaveChanges();

        dto.Id = threshold.Id;

        return CreatedAtAction(nameof(GetByPond), new { pondId = dto.PondId }, dto);
    }
}
