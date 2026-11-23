using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopMvc.Data;
using ShopMvc.Models;
using ShopMvc.Services;

namespace ShopMvc.Controllers;

public class CartController(AppDbContext db, CartService cart) : Controller
{
    // Сторінка кошика
    public async Task<IActionResult> Index()
    {
        var items = cart.GetItems();
        var ids = items.Select(i => i.ProductId).ToList();

        var products = await db.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Where(p => ids.Contains(p.Id))
            .ToDictionaryAsync(p => p.Id);

        var vm = new CartViewModel
        {
            Lines = items
                .Where(i => products.ContainsKey(i.ProductId))   // товар могли видалити з БД
                .Select(i => new CartLineViewModel { Product = products[i.ProductId], Quantity = i.Quantity })
                .ToList()
        };
        return View(vm);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Add(int productId, string? returnUrl)
    {
        if (await db.Products.AnyAsync(p => p.Id == productId))
        {
            cart.Add(productId);
            TempData["CartMessage"] = "Товар додано до кошика";
        }
        return Url.IsLocalUrl(returnUrl) ? Redirect(returnUrl!) : RedirectToAction(nameof(Index));
    }

    // Збільшити кількість
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Increase(int productId)
    {
        cart.ChangeQuantity(productId, +1);
        return RedirectToAction(nameof(Index));
    }

    // Зменшити кількість (якщо стане < 1 - товар видаляється)
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Decrease(int productId)
    {
        cart.ChangeQuantity(productId, -1);
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Remove(int productId)
    {
        cart.Remove(productId);
        return RedirectToAction(nameof(Index));
    }

    // Оформити замовлення: очищаємо кошик і переходимо на головну
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Checkout()
    {
        if (cart.Count > 0)
            TempData["CartMessage"] = "Дякуємо! Замовлення оформлено.";
        cart.Clear();
        return RedirectToAction("Index", "Home");
    }
}
