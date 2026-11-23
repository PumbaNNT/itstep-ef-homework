using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopMvc.Data;
using ShopMvc.Models;

namespace ShopMvc.Controllers;

public class HomeController(AppDbContext db) : Controller
{
    // Головна сторінка: всі товари, згруповані за категоріями
    public async Task<IActionResult> Index()
    {
        var categories = await db.Categories
            .AsNoTracking()
            .Include(c => c.Products)
            .OrderBy(c => c.Id)
            .ToListAsync();

        return View(categories);
    }

    // Детальна інформація про перший товар у базі
    public async Task<IActionResult> Details()
    {
        var product = await db.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .OrderBy(p => p.Id)
            .FirstOrDefaultAsync();

        if (product is null) return NotFound();
        return View(product);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
