using Microsoft.AspNetCore.Mvc;
using Data;
using Dtos;
using Models;
using Microsoft.EntityFrameworkCore;

namespace Controllers;

[ApiController]
[Route("api/[controller]")]
public class AlertController : ControllerBase
{
    private readonly AppDbContext _context;

    public AlertController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("pond/{pondId}")]
    public async Task<ActionResult<IEnumerable<Alert>>> GetAlertsForPond(int pondId)
    {
        var alerts = await _context.Alerts
            .Where(a => a.PondId == pondId)
            .OrderByDescending(a => a.Timestamp)
            .ToListAsync();

        return Ok(alerts);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Alert>> GetAlert(int id)
    {
        var alert = await _context.Alerts.FindAsync(id);

        if (alert == null)
        {
            return NotFound();
        }

        return Ok(alert);
    }

    [HttpPost]
    public async Task<ActionResult<Alert>> CreateAlert(Alert alert)
    {
        _context.Alerts.Add(alert);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAlert), new { id = alert.Id }, alert);
    }

    [HttpPut("{id}/acknowledge")]
    public async Task<IActionResult> AcknowledgeAlert(int id)
    {
        var alert = await _context.Alerts.FindAsync(id);

        if (alert == null)
        {
            return NotFound();
        }

        alert.IsAcknowledged = true;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAlert(int id)
    {
        var alert = await _context.Alerts.FindAsync(id);

        if (alert == null)
        {
            return NotFound();
        }

        _context.Alerts.Remove(alert);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
