using GamesCatalog.Data;
using GamesCatalog.Models;
using Microsoft.EntityFrameworkCore;

namespace GamesCatalog.Services;

// CRUD для Genres
public class GenreService(CatalogContext db)
{
    public Genre Create(Genre genre)
    {
        db.Genres.Add(genre);
        db.SaveChanges();
        return genre;
    }

    // Eager loading: жанри разом з іграми
    public List<Genre> GetAll() =>
        db.Genres.AsNoTracking()
          .Include(g => g.Games)
          .OrderBy(g => g.Id)
          .ToList();

    public Genre? GetById(int id) =>
        db.Genres.Include(g => g.Games).FirstOrDefault(g => g.Id == id);

    public bool Update(int id, string newName)
    {
        var genre = db.Genres.Find(id);
        if (genre is null) return false;
        genre.Name = newName;
        db.SaveChanges();
        return true;
    }

    public bool Delete(int id)
    {
        var genre = db.Genres.Find(id);
        if (genre is null) return false;
        db.Genres.Remove(genre);    // записи в GameGenres видаляються каскадно
        db.SaveChanges();
        return true;
    }

    // Виводить всі ігри вказаного жанру (eager loading)
    public List<Game> GetGamesByGenre(string genreName)
    {
        var genre = db.Genres
            .AsNoTracking()
            .Include(g => g.Games)
            .FirstOrDefault(g => g.Name == genreName);

        return genre?.Games.OrderBy(g => g.Title).ToList() ?? new();
    }
}
