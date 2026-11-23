using GamesCatalog.Data;
using GamesCatalog.Models;
using Microsoft.EntityFrameworkCore;

namespace GamesCatalog.Services;

// CRUD для Games
public class GameService(CatalogContext db)
{
    public Game Create(Game game, params int[] genreIds)
    {
        game.Genres = db.Genres.Where(g => genreIds.Contains(g.Id)).ToList();
        db.Games.Add(game);
        db.SaveChanges();
        return game;
    }

    // Eager loading жанрів (Games <-> Genres)
    public List<Game> GetAll() =>
        db.Games.AsNoTracking()
          .Include(g => g.Genres)
          .OrderBy(g => g.Id)
          .ToList();

    // Eager loading для жанрів + explicit loading для видавця
    public Game? GetById(int id)
    {
        var game = db.Games
            .Include(g => g.Genres)
            .FirstOrDefault(g => g.Id == id);
        if (game is null) return null;

        db.Entry(game)
          .Reference(g => g.Publisher)
          .Load();

        return game;
    }

    public bool Update(int id, Action<Game> change)
    {
        var game = db.Games.Include(g => g.Genres).FirstOrDefault(g => g.Id == id);
        if (game is null) return false;
        change(game);
        db.SaveChanges();
        return true;
    }

    public bool SetGenres(int gameId, params int[] genreIds)
    {
        var game = db.Games.Include(g => g.Genres).FirstOrDefault(g => g.Id == gameId);
        if (game is null) return false;
        game.Genres.Clear();
        game.Genres.AddRange(db.Genres.Where(g => genreIds.Contains(g.Id)));
        db.SaveChanges();
        return true;
    }

    public bool Delete(int id)
    {
        var game = db.Games.Find(id);
        if (game is null) return false;
        db.Games.Remove(game);
        db.SaveChanges();
        return true;
    }

    // Виводить жанри вказаної гри (eager loading)
    public List<Genre> GetGenresOfGame(string title)
    {
        var game = db.Games
            .AsNoTracking()
            .Include(g => g.Genres)
            .FirstOrDefault(g => g.Title == title);

        return game?.Genres.OrderBy(g => g.Name).ToList() ?? new();
    }
}
