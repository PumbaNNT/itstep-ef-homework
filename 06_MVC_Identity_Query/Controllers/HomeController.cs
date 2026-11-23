using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopMvc.Data;
using ShopMvc.Models;

namespace ShopMvc.Controllers;

public class HomeController(AppDbContext db) : Controller
{
    // Головна сторінка з товарами + сортування (?sort=price_asc|price_desc|name|rating)
    public async Task<IActionResult> Index(string? sort)
    {
        var vm = new CatalogViewModel
        {
            Sort = sort,
            TotalProducts = await db.Products.CountAsync()
        };

        IQueryable<Product> query = db.Products.AsNoTracking().Include(p => p.Category);

        query = sort switch
        {
            "price_asc" => query.OrderBy(p => p.Price).ThenBy(p => p.Name),
            "price_desc" => query.OrderByDescending(p => p.Price).ThenBy(p => p.Name),
            "name" => query.OrderBy(p => p.Name),
            "rating" => query.OrderByDescending(p => p.Rating).ThenBy(p => p.Name),
            _ => query.OrderBy(p => p.Id)
        };

        if (string.IsNullOrEmpty(sort) || !CatalogViewModel.SortOptions.Any(o => o.Value == sort))
        {
            vm.Sort = null;
            vm.Categories = await db.Categories
                .AsNoTracking()
                .Include(c => c.Products)
                .OrderBy(c => c.Id)
                .ToListAsync();
        }
        else
        {
            vm.SortedProducts = await query.ToListAsync();
        }

        return View(vm);
    }

    // Детальна інформація про товар (без id - перший товар у базі)
    public async Task<IActionResult> Details(int? id)
    {
        var query = db.Products.AsNoTracking().Include(p => p.Category);
        var product = id is null
            ? await query.OrderBy(p => p.Id).FirstOrDefaultAsync()
            : await query.FirstOrDefaultAsync(p => p.Id == id);

        if (product is null) return NotFound();
        return View(product);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
