using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ShopMvc.Data;
using ShopMvc.Models;
using ShopMvc.Services;

namespace ShopMvc.Controllers;

// Додавання, редагування та видалення товарів - тільки для адмінів
[Authorize(Roles = Roles.Admin)]
public class ProductController(AppDbContext db, ImageService images) : Controller
{
    public async Task<IActionResult> Index()
    {
        var products = await db.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .OrderByDescending(p => p.Id)
            .ToListAsync();
        return View(products);
    }

    // ---------- Create ----------
    [HttpGet]
    public async Task<IActionResult> Create()
    {
        var vm = new ProductFormViewModel();
        await FillCategoriesAsync(vm);
        return View(vm);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(ProductFormViewModel vm)
    {
        ValidateImage(vm.ImageFile);
        if (!ModelState.IsValid)
        {
            await FillCategoriesAsync(vm);
            return View(vm);
        }

        var product = new Product
        {
            Name = vm.Name,
            Description = vm.Description ?? string.Empty,
            Price = vm.Price,
            Amount = vm.Amount,
            Rating = vm.Rating,
            CategoryId = vm.CategoryId,
            Image = vm.ImageFile is not null ? await images.SaveAsync(vm.ImageFile) : null
        };

        db.Products.Add(product);
        await db.SaveChangesAsync();
        TempData["Message"] = $"Товар \"{product.Name}\" додано";
        return RedirectToAction(nameof(Index));
    }

    // ---------- Edit ----------
    [HttpGet]
    public async Task<IActionResult> Edit(int id)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null) return NotFound();

        var vm = new ProductFormViewModel
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            Amount = product.Amount,
            Rating = product.Rating,
            CategoryId = product.CategoryId,
            CurrentImage = product.Image
        };
        await FillCategoriesAsync(vm);
        return View(vm);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, ProductFormViewModel vm)
    {
        if (id != vm.Id) return BadRequest();

        var product = await db.Products.FindAsync(id);
        if (product is null) return NotFound();

        ValidateImage(vm.ImageFile);
        if (!ModelState.IsValid)
        {
            vm.CurrentImage = product.Image;
            await FillCategoriesAsync(vm);
            return View(vm);
        }

        product.Name = vm.Name;
        product.Description = vm.Description ?? string.Empty;
        product.Price = vm.Price;
        product.Amount = vm.Amount;
        product.Rating = vm.Rating;
        product.CategoryId = vm.CategoryId;

        if (vm.ImageFile is not null)
        {
            // Зміна фото: видаляємо попереднє зображення і зберігаємо нове
            images.Delete(product.Image);
            product.Image = await images.SaveAsync(vm.ImageFile);
        }
        else if (vm.RemoveImage)
        {
            images.Delete(product.Image);
            product.Image = null;
        }

        await db.SaveChangesAsync();
        TempData["Message"] = $"Товар \"{product.Name}\" оновлено";
        return RedirectToAction(nameof(Index));
    }

    // ---------- Delete ----------
    [HttpGet]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await db.Products.AsNoTracking()
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id);
        return product is null ? NotFound() : View(product);
    }

    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null) return NotFound();

        // Видалення товару: видаляємо і його зображення
        images.Delete(product.Image);
        db.Products.Remove(product);
        await db.SaveChangesAsync();

        TempData["Message"] = $"Товар \"{product.Name}\" видалено";
        return RedirectToAction(nameof(Index));
    }

    private void ValidateImage(IFormFile? file)
    {
        if (file is null) return;
        if (!ImageService.IsAllowed(file))
            ModelState.AddModelError(nameof(ProductFormViewModel.ImageFile), "Дозволені формати: jpg, jpeg, png, webp, gif");
        if (file.Length > ImageService.MaxSize)
            ModelState.AddModelError(nameof(ProductFormViewModel.ImageFile), "Максимальний розмір фото - 5 МБ");
    }

    private async Task FillCategoriesAsync(ProductFormViewModel vm)
    {
        vm.Categories = await db.Categories
            .AsNoTracking()
            .OrderBy(c => c.Name)
            .Select(c => new SelectListItem(c.Name, c.Id.ToString()))
            .ToListAsync();
    }
}
