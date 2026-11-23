using GamesApi.Entities;

namespace GamesApi.Repositories;

public interface IDeveloperRepository
{
    Task<List<Developer>> GetAllAsync();
    Task<Developer?> GetByIdAsync(int id);
    Task<Developer> CreateAsync(Developer developer);
    Task<bool> UpdateAsync(Developer developer);
    Task<bool> DeleteAsync(int id);
}
