using GamesCatalog.Data;
using GamesCatalog.Models;
using GamesCatalog.Services;
using Microsoft.EntityFrameworkCore;

Console.OutputEncoding = System.Text.Encoding.UTF8;

using var db = new CatalogContext();
db.Database.Migrate();

var publishers = new PublisherService(db);
var genres = new GenreService(db);
var games = new GameService(db);

// ---------- Початкові дані (Create) ----------
if (!db.Publishers.Any())
{
    var cdpr = publishers.Create(new Publisher { Name = "CD Projekt", Country = "Poland", FoundedYear = 1994, Website = "cdprojekt.com" });
    var gsc = publishers.Create(new Publisher { Name = "GSC Game World", Country = "Ukraine", FoundedYear = 1995, Website = "gsc-game.com" });
    var valve = publishers.Create(new Publisher { Name = "Valve", Country = "USA", FoundedYear = 1996, Website = "valvesoftware.com" });

    var rpg = genres.Create(new Genre { Name = "RPG" });
    var shooter = genres.Create(new Genre { Name = "Shooter" });
    var openWorld = genres.Create(new Genre { Name = "Open World" });
    var puzzle = genres.Create(new Genre { Name = "Puzzle" });

    games.Create(new Game { Title = "The Witcher 3", Description = "Пригоди відьмака Геральта", Price = 29.99m,
                            ReleaseDate = new DateTime(2015, 5, 19), PublisherId = cdpr.Id }, rpg.Id, openWorld.Id);
    games.Create(new Game { Title = "Cyberpunk 2077", Description = "RPG у Найт-Сіті", Price = 59.99m,
                            ReleaseDate = new DateTime(2020, 12, 10), PublisherId = cdpr.Id }, rpg.Id, shooter.Id, openWorld.Id);
    games.Create(new Game { Title = "S.T.A.L.K.E.R. 2", Description = "Зона відчуження", Price = 59.99m,
                            ReleaseDate = new DateTime(2024, 11, 20), PublisherId = gsc.Id }, shooter.Id, openWorld.Id);
    games.Create(new Game { Title = "Portal 2", Description = "Головоломка з порталами", Price = 9.99m,
                            ReleaseDate = new DateTime(2011, 4, 19), PublisherId = valve.Id }, puzzle.Id);
}

// ---------- Read ----------
Section("Видавці");
publishers.GetAll().ForEach(p => Console.WriteLine("  " + p));

Section("Жанри (eager loading ігор)");
foreach (var g in genres.GetAll())
    Console.WriteLine($"  {g} - ігор: {g.Games.Count}");

Section("Ігри (eager loading жанрів)");
foreach (var g in games.GetAll())
    Console.WriteLine($"  {g}  | жанри: {string.Join(", ", g.Genres.Select(x => x.Name))}");

// ---------- Додаткові методи ----------
Section("Ігри жанру \"Open World\"");
genres.GetGamesByGenre("Open World").ForEach(g => Console.WriteLine("  " + g));

Section("Жанри гри \"Cyberpunk 2077\"");
games.GetGenresOfGame("Cyberpunk 2077").ForEach(g => Console.WriteLine("  " + g));

var firstPublisher = publishers.GetAll().First();
Section($"Ігри видавця \"{firstPublisher.Name}\" (explicit loading)");
publishers.GetGamesOfPublisher(firstPublisher.Id).ForEach(g => Console.WriteLine("  " + g));

var witcher = db.Games.AsNoTracking().First(g => g.Title == "The Witcher 3");
var witcherFull = games.GetById(witcher.Id)!;
Section("GetById гри (Genres - eager, Publisher - explicit)");
Console.WriteLine($"  {witcherFull} | видавець: {witcherFull.Publisher.Name} | жанри: {string.Join(", ", witcherFull.Genres.Select(x => x.Name))}");

// ---------- Update / Delete (демонстрація на тимчасових записах) ----------
Section("Update / Delete");
var tmpPublisher = publishers.Create(new Publisher { Name = "Temp Studio", Country = "Ukraine", FoundedYear = 2020, Website = "temp.ua" });
var tmpGenre = genres.Create(new Genre { Name = "Temp genre" });
var tmpGame = games.Create(new Game { Title = "Temp game", Description = "Тест", Price = 1m,
                                      ReleaseDate = DateTime.Today, PublisherId = tmpPublisher.Id }, tmpGenre.Id);

publishers.Update(tmpPublisher.Id, p => p.Website = "temp-studio.ua");
genres.Update(tmpGenre.Id, "Temp genre (updated)");
games.Update(tmpGame.Id, g => g.Price = 4.99m);
Console.WriteLine($"  Оновлено: {publishers.GetById(tmpPublisher.Id)} | {genres.GetById(tmpGenre.Id)} | {games.GetById(tmpGame.Id)}");

Console.WriteLine($"  Видалено гру: {games.Delete(tmpGame.Id)}, жанр: {genres.Delete(tmpGenre.Id)}, видавця: {publishers.Delete(tmpPublisher.Id)}");
Console.WriteLine($"  Залишилось: видавців {db.Publishers.Count()}, жанрів {db.Genres.Count()}, ігор {db.Games.Count()}");

static void Section(string title)
{
    Console.WriteLine();
    Console.WriteLine("=== " + title + " ===");
}
