using Microsoft.EntityFrameworkCore;
using ShopMvc.Models;

namespace ShopMvc.Data;

public static class Seeder
{
    // 10 категорій по 5 товарів = 50 товарів
    private static readonly Dictionary<string, (string Name, decimal Price)[]> Catalog = new()
    {
        ["Смартфони"] = [("iPhone 16", 42999m), ("Samsung Galaxy S25", 38999m), ("Google Pixel 9", 31999m), ("Xiaomi 14T", 19999m), ("Motorola Edge 50", 14999m)],
        ["Ноутбуки"] = [("MacBook Air M3", 54999m), ("ASUS ZenBook 14", 39999m), ("Lenovo ThinkPad E14", 32999m), ("HP Pavilion 15", 27999m), ("Acer Aspire 5", 21999m)],
        ["Планшети"] = [("iPad Air", 29999m), ("Samsung Galaxy Tab S9", 27999m), ("Xiaomi Pad 6", 13999m), ("Lenovo Tab P12", 12999m), ("Huawei MatePad 11", 15999m)],
        ["Навушники"] = [("AirPods Pro 2", 9999m), ("Sony WH-1000XM5", 13999m), ("JBL Tune 770NC", 3999m), ("Marshall Major IV", 5499m), ("Samsung Galaxy Buds3", 6999m)],
        ["Телевізори"] = [("LG OLED C4 55\"", 59999m), ("Samsung QLED Q80D 55\"", 42999m), ("Sony Bravia 7 55\"", 49999m), ("Philips Ambilight 50\"", 24999m), ("Xiaomi TV A Pro 55\"", 17999m)],
        ["Фотоапарати"] = [("Canon EOS R50", 33999m), ("Sony Alpha a6400", 37999m), ("Nikon Z50", 35999m), ("Fujifilm X-T30 II", 39999m), ("GoPro HERO13", 17999m)],
        ["Ігрові консолі"] = [("PlayStation 5", 23999m), ("Xbox Series X", 22999m), ("Nintendo Switch OLED", 14999m), ("Steam Deck OLED", 24999m), ("Xbox Series S", 12999m)],
        ["Розумний годинник"] = [("Apple Watch Series 10", 17999m), ("Samsung Galaxy Watch7", 11999m), ("Garmin Venu 3", 18999m), ("Xiaomi Watch 2", 6999m), ("Huawei Watch GT 5", 8999m)],
        ["Побутова техніка"] = [("Dyson V15 Detect", 29999m), ("Philips Airfryer XXL", 8999m), ("Bosch Serie 6 пральна машина", 24999m), ("De'Longhi Magnifica S", 15999m), ("Xiaomi Robot Vacuum S20", 10999m)],
        ["Аксесуари"] = [("Logitech MX Master 3S", 4299m), ("Anker PowerBank 20000", 1999m), ("Apple MagSafe Charger", 1899m), ("Keychron K2 клавіатура", 3999m), ("SanDisk Extreme 1TB SSD", 5499m)],
    };

    public static void Seed(AppDbContext db)
    {
        db.Database.Migrate();

        if (db.Categories.Any()) return;

        int imageIndex = 1;
        foreach (var (categoryName, products) in Catalog)
        {
            var category = new Category { Name = categoryName };
            foreach (var (name, price) in products)
            {
                category.Products.Add(new Product
                {
                    Name = name,
                    Price = price,
                    Amount = 5 + (imageIndex * 7) % 40,
                    Description = $"{name} - якісний товар з категорії \"{categoryName}\". Офіційна гарантія 12 місяців, швидка доставка по всій Україні.",
                    Image = $"https://picsum.photos/seed/product{imageIndex}/600/400"
                });
                imageIndex++;
            }
            db.Categories.Add(category);
        }

        db.SaveChanges();
    }
}
