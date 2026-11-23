using Microsoft.EntityFrameworkCore;
using VideoGamesShop.Data;

Console.OutputEncoding = System.Text.Encoding.UTF8;

using var db = new ShopContext();
db.Database.Migrate();
DbSeeder.Seed(db);

// 1. Вивести всі ігри з розробниками
PrintTitle("1. Ігри з розробниками");
foreach (var g in db.Games.Include(g => g.Developer).OrderBy(g => g.Title))
    Console.WriteLine($"  {g.Title,-30} {g.Price,7:F2}$  {g.ReleaseYear}  - {g.Developer.Name} ({g.Developer.Country})");

// 2. Вивести замовлення з клієнтами та іграми
PrintTitle("2. Замовлення з клієнтами та іграми");
var orders = db.Orders
    .Include(o => o.Customer)
    .Include(o => o.OrderItems).ThenInclude(oi => oi.Game)
    .OrderBy(o => o.Id)
    .ToList();
foreach (var o in orders)
{
    Console.WriteLine($"  Замовлення #{o.Id} від {o.OrderDate:dd.MM.yyyy}, клієнт: {o.Customer.FullName}");
    foreach (var oi in o.OrderItems)
        Console.WriteLine($"      - {oi.Game.Title} x{oi.Quantity}");
}

// 3. Порахувати суму кожного замовлення
PrintTitle("3. Сума кожного замовлення");
var orderTotals = db.Orders
    .Select(o => new { o.Id, Total = o.OrderItems.Sum(oi => oi.Game.Price * oi.Quantity) })
    .OrderBy(x => x.Id)
    .ToList();
foreach (var x in orderTotals)
    Console.WriteLine($"  Замовлення #{x.Id}: {x.Total:F2}$");

// 4. Топ 3 найдорожчі ігри
PrintTitle("4. Топ-3 найдорожчі ігри");
foreach (var g in db.Games.OrderByDescending(g => g.Price).ThenBy(g => g.Title).Take(3))
    Console.WriteLine($"  {g.Title} - {g.Price:F2}$");

// 5. Клієнти з більш ніж 1 замовленням
PrintTitle("5. Клієнти з більш ніж 1 замовленням");
var loyal = db.Customers
    .Where(c => c.Orders.Count > 1)
    .Select(c => new { c.FullName, Count = c.Orders.Count });
foreach (var c in loyal)
    Console.WriteLine($"  {c.FullName} - {c.Count} замовлень");

// 6. Загальний дохід магазину
PrintTitle("6. Загальний дохід магазину");
var revenue = db.OrderItems.Sum(oi => oi.Game.Price * oi.Quantity);
Console.WriteLine($"  {revenue:F2}$");

static void PrintTitle(string text)
{
    Console.WriteLine();
    Console.WriteLine(text);
    Console.WriteLine(new string('-', text.Length));
}
