using VideoGamesShop.Models;

namespace VideoGamesShop.Data;

public static class DbSeeder
{
    public static void Seed(ShopContext db)
    {
        if (db.Developers.Any()) return;

        // 5 розробників
        var devs = new List<Developer>
        {
            new() { Name = "CD Projekt Red", Country = "Poland" },
            new() { Name = "GSC Game World", Country = "Ukraine" },
            new() { Name = "Valve", Country = "USA" },
            new() { Name = "Nintendo", Country = "Japan" },
            new() { Name = "Ubisoft", Country = "France" },
        };

        // 10 ігор
        var games = new List<Game>
        {
            new() { Title = "The Witcher 3", Price = 29.99m, ReleaseYear = 2015, Developer = devs[0] },
            new() { Title = "Cyberpunk 2077", Price = 59.99m, ReleaseYear = 2020, Developer = devs[0] },
            new() { Title = "S.T.A.L.K.E.R. 2", Price = 59.99m, ReleaseYear = 2024, Developer = devs[1] },
            new() { Title = "Cossacks 3", Price = 19.99m, ReleaseYear = 2016, Developer = devs[1] },
            new() { Title = "Half-Life: Alyx", Price = 49.99m, ReleaseYear = 2020, Developer = devs[2] },
            new() { Title = "Portal 2", Price = 9.99m, ReleaseYear = 2011, Developer = devs[2] },
            new() { Title = "Zelda: Tears of the Kingdom", Price = 69.99m, ReleaseYear = 2023, Developer = devs[3] },
            new() { Title = "Mario Kart 8", Price = 59.99m, ReleaseYear = 2017, Developer = devs[3] },
            new() { Title = "Assassin's Creed Valhalla", Price = 39.99m, ReleaseYear = 2020, Developer = devs[4] },
            new() { Title = "Far Cry 6", Price = 29.99m, ReleaseYear = 2021, Developer = devs[4] },
        };

        // 8 клієнтів
        var customers = new List<Customer>
        {
            new() { FullName = "Іван Петренко", Email = "ivan@example.com" },
            new() { FullName = "Олена Коваль", Email = "olena@example.com" },
            new() { FullName = "Андрій Шевчук", Email = "andrii@example.com" },
            new() { FullName = "Марія Бондар", Email = "maria@example.com" },
            new() { FullName = "Тарас Мельник", Email = "taras@example.com" },
            new() { FullName = "Софія Ткаченко", Email = "sofia@example.com" },
            new() { FullName = "Максим Кравець", Email = "maksym@example.com" },
            new() { FullName = "Юлія Лисенко", Email = "yulia@example.com" },
        };

        // 10 замовлень (у деяких клієнтів по кілька замовлень)
        int[] orderCustomer = { 0, 0, 1, 2, 2, 2, 3, 4, 5, 6 };
        var orders = orderCustomer
            .Select((c, i) => new Order { Customer = customers[c], OrderDate = new DateTime(2026, 7, 1).AddDays(i * 3) })
            .ToList();

        // 20 позицій OrderItem (по 2 на кожне замовлення, ігри не повторюються в межах замовлення)
        var items = new List<OrderItem>();
        for (int i = 0; i < orders.Count; i++)
        {
            items.Add(new OrderItem { Order = orders[i], Game = games[i], Quantity = 1 + i % 3 });
            items.Add(new OrderItem { Order = orders[i], Game = games[(i + 5) % games.Count], Quantity = 1 + (i + 1) % 2 });
        }

        db.Developers.AddRange(devs);
        db.Games.AddRange(games);
        db.Customers.AddRange(customers);
        db.Orders.AddRange(orders);
        db.OrderItems.AddRange(items);
        db.SaveChanges();
    }
}
