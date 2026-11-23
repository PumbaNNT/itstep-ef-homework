using GamesApi.Data;
using GamesApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace GamesApi.Repositories;

// Репозиторій інкапсулює роботу з БД для Developer
public class DeveloperRepository(AppDbContext db) : IDeveloperRepository
{
    public Task<List<Developer>> GetAllAsync() =>
        db.Developers
          .AsNoTracking()
          .Include(d => d.Games)
          .OrderBy(d => d.Id)
          .ToListAsync();

    public Task<Developer?> GetByIdAsync(int id) =>
        db.Developers
          .AsNoTracking()
          .Include(d => d.Games)
          .FirstOrDefaultAsync(d => d.Id == id);

    public async Task<Developer> CreateAsync(Developer developer)
    {
        db.Developers.Add(developer);
        await db.SaveChangesAsync();
        return developer;
    }

    public async Task<bool> UpdateAsync(Developer developer)
    {
        var existing = await db.Developers.FindAsync(developer.Id);
        if (existing is null) return false;

        existing.Name = developer.Name;
        existing.Country = developer.Country;
        existing.FoundedYear = developer.FoundedYear;
        existing.Website = developer.Website;

        await db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existing = await db.Developers.FindAsync(id);
        if (existing is null) return false;

        db.Developers.Remove(existing);
        await db.SaveChangesAsync();
        return true;
    }
}
