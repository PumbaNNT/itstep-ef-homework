using AutoMapper;
using FluentValidation;
using GamesApi.Dtos;
using GamesApi.Entities;
using GamesApi.Repositories;

namespace GamesApi.Services;

public interface IDeveloperService
{
    Task<List<DeveloperDto>> GetAllAsync();
    Task<DeveloperDto?> GetByIdAsync(int id);
    Task<DeveloperDto> CreateAsync(CreateDeveloperDto dto);
    Task<bool> UpdateAsync(int id, UpdateDeveloperDto dto);
    Task<bool> DeleteAsync(int id);
}

// Бізнес-логіка: валідація (FluentValidation) + мапінг (AutoMapper) + виклик репозиторію
public class DeveloperService(
    IDeveloperRepository repository,
    IMapper mapper,
    IValidator<CreateDeveloperDto> createValidator,
    IValidator<UpdateDeveloperDto> updateValidator) : IDeveloperService
{
    public async Task<List<DeveloperDto>> GetAllAsync() =>
        mapper.Map<List<DeveloperDto>>(await repository.GetAllAsync());

    public async Task<DeveloperDto?> GetByIdAsync(int id)
    {
        var developer = await repository.GetByIdAsync(id);
        return developer is null ? null : mapper.Map<DeveloperDto>(developer);
    }

    public async Task<DeveloperDto> CreateAsync(CreateDeveloperDto dto)
    {
        await createValidator.ValidateAndThrowAsync(dto);   // 400, якщо дані некоректні

        var entity = mapper.Map<Developer>(dto);
        var created = await repository.CreateAsync(entity);
        return mapper.Map<DeveloperDto>(created);
    }

    public async Task<bool> UpdateAsync(int id, UpdateDeveloperDto dto)
    {
        await updateValidator.ValidateAndThrowAsync(dto);

        var entity = mapper.Map<Developer>(dto);
        entity.Id = id;
        return await repository.UpdateAsync(entity);
    }

    public Task<bool> DeleteAsync(int id) => repository.DeleteAsync(id);
}
