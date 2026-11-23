using GamesCatalog.Data;
using GamesCatalog.Models;
using Microsoft.EntityFrameworkCore;

namespace GamesCatalog.Services;

// CRUD для Publishers
public class PublisherService(CatalogContext db)
{
    public Publisher Create(Publisher publisher)
    {
        db.Publishers.Add(publisher);
        db.SaveChanges();
        return publisher;
    }

    public List<Publisher> GetAll() => db.Publishers.AsNoTracking().OrderBy(p => p.Id).ToList();

    public Publisher? GetById(int id) => db.Publishers.Find(id);

    public bool Update(int id, Action<Publisher> change)
    {
        var publisher = db.Publishers.Find(id);
        if (publisher is null) return false;
        change(publisher);          // змінений трекінгом об'єкт
        db.SaveChanges();
        return true;
    }

    public bool Delete(int id)
    {
        var publisher = db.Publishers.Find(id);
        if (publisher is null) return false;
        db.Publishers.Remove(publisher);
        db.SaveChanges();
        return true;
    }

    // Виводить всі ігри видавця (explicit loading)
    public List<Game> GetGamesOfPublisher(int publisherId)
    {
        var publisher = db.Publishers.Find(publisherId);
        if (publisher is null) return new();

        db.Entry(publisher)
          .Collection(p => p.Games)
          .Load();

        return publisher.Games.OrderBy(g => g.Title).ToList();
    }
}
