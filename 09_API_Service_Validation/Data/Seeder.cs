using GamesApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace GamesApi.Data;

// Застосовує міграції та заповнює БД початковими даними
public static class Seeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        await db.Database.MigrateAsync();
        if (await db.Developers.AnyAsync()) return;

        db.Developers.AddRange(
            new Developer
            {
                Name = "CD Projekt Red", Country = "Poland", FoundedYear = 2002, Website = "https://www.cdprojektred.com",
                Games = [new() { Title = "The Witcher 3", Price = 29.99m, ReleaseYear = 2015 },
                         new() { Title = "Cyberpunk 2077", Price = 59.99m, ReleaseYear = 2020 }]
            },
            new Developer
            {
                Name = "GSC Game World", Country = "Ukraine", FoundedYear = 1995, Website = "https://www.gsc-game.com",
                Games = [new() { Title = "S.T.A.L.K.E.R. 2", Price = 59.99m, ReleaseYear = 2024 },
                         new() { Title = "Cossacks 3", Price = 19.99m, ReleaseYear = 2016 }]
            },
            new Developer
            {
                Name = "Valve", Country = "USA", FoundedYear = 1996, Website = "https://www.valvesoftware.com",
                Games = [new() { Title = "Half-Life: Alyx", Price = 49.99m, ReleaseYear = 2020 },
                         new() { Title = "Portal 2", Price = 9.99m, ReleaseYear = 2011 }]
            },
            new Developer
            {
                Name = "4A Games", Country = "Ukraine", FoundedYear = 2006, Website = "https://www.4a-games.com.mt",
                Games = [new() { Title = "Metro Exodus", Price = 29.99m, ReleaseYear = 2019 }]
            },
            new Developer
            {
                Name = "Nintendo", Country = "Japan", FoundedYear = 1889, Website = "https://www.nintendo.com",
                Games = [new() { Title = "Mario Kart 8", Price = 59.99m, ReleaseYear = 2017 }]
            });

        await db.SaveChangesAsync();
    }
}
