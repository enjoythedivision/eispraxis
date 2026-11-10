using Eispraxis.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Eispraxis.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly DashboardService _dashboardService;

    public DashboardController(DashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet("unpaid")]
    public async Task<IActionResult> GetUnpaidCustomers(int year, int month)
    {
        var customers = await _dashboardService.GetUnpaidCustomersAsync(year, month);
        return Ok(customers);
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetDashboardSummary(int year, int month)
    {
        var summary = await _dashboardService.GetDashboardSummaryAsync(year, month);
        return Ok(summary);
    }
}
