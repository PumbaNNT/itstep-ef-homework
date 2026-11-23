using Games.Data;
using Games.Models;
using Microsoft.EntityFrameworkCore;

Console.OutputEncoding = System.Text.Encoding.UTF8;

using var db = new GamesContext();

// Завдання 3: створення / оновлення бази даних з класу-моделі (через міграції)
db.Database.Migrate();
Console.WriteLine("Під'єднання до бази даних: " + (db.Database.CanConnect() ? "OK" : "помилка"));

// Внесення інформації про декілька ігор
if (!db.Games.Any())
{
    db.Games.AddRange(
        new Game { Title = "The Witcher 3", Studio = "CD Projekt Red", Genre = "RPG",
                   ReleaseDate = new DateTime(2015, 5, 19), Mode = GameMode.SinglePlayer, CopiesSold = 50_000_000 },
        new Game { Title = "S.T.A.L.K.E.R. 2", Studio = "GSC Game World", Genre = "Shooter",
                   ReleaseDate = new DateTime(2024, 11, 20), Mode = GameMode.SinglePlayer, CopiesSold = 1_000_000 },
        new Game { Title = "Counter-Strike 2", Studio = "Valve", Genre = "Shooter",
                   ReleaseDate = new DateTime(2023, 9, 27), Mode = GameMode.MultiPlayer, CopiesSold = 70_000_000 },
        new Game { Title = "Minecraft", Studio = "Mojang", Genre = "Sandbox",
                   ReleaseDate = new DateTime(2011, 11, 18), Mode = GameMode.MultiPlayer, CopiesSold = 300_000_000 });
    db.SaveChanges();
}

// Відображення інформації про ігри
Console.WriteLine();
Console.WriteLine($"{"Id",-3} {"Назва",-20} {"Студія",-16} {"Стиль",-9} {"Реліз",-11} {"Режим",-13} {"Продано",12}");
foreach (var g in db.Games.AsNoTracking().OrderBy(g => g.ReleaseDate))
{
    Console.WriteLine($"{g.Id,-3} {g.Title,-20} {g.Studio,-16} {g.Genre,-9} {g.ReleaseDate:dd.MM.yyyy}  {g.Mode,-13} {g.CopiesSold,12:N0}");
}
