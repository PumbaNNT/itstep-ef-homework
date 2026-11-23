using AutoMapper;
using GamesApi.Dtos;
using GamesApi.Entities;

namespace GamesApi.Mapping;

// Профіль AutoMapper: Entity <-> DTO
public class DeveloperProfile : Profile
{
    public DeveloperProfile()
    {
        CreateMap<Game, GameShortDto>();

        CreateMap<Developer, DeveloperDto>()
            .ForMember(d => d.GamesCount, o => o.MapFrom(s => s.Games.Count));

        CreateMap<CreateDeveloperDto, Developer>()
            .ForMember(d => d.Id, o => o.Ignore())
            .ForMember(d => d.Games, o => o.Ignore());

        CreateMap<UpdateDeveloperDto, Developer>()
            .ForMember(d => d.Id, o => o.Ignore())
            .ForMember(d => d.Games, o => o.Ignore());
    }
}
