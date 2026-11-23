namespace GamesApi.Dtos;

// Те, що повертає API
public class DeveloperDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public int FoundedYear { get; set; }
    public string? Website { get; set; }
    public int GamesCount { get; set; }
    public List<GameShortDto> Games { get; set; } = new();
}

public class GameShortDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int ReleaseYear { get; set; }
}

// Спільні поля для створення / оновлення (використовуються одним валідатором)
public interface IDeveloperInput
{
    string Name { get; }
    string Country { get; }
    int FoundedYear { get; }
    string? Website { get; }
}

// Тіло POST-запиту
public class CreateDeveloperDto : IDeveloperInput
{
    public string Name { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public int FoundedYear { get; set; }
    public string? Website { get; set; }
}

// Тіло PUT-запиту
public class UpdateDeveloperDto : IDeveloperInput
{
    public string Name { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public int FoundedYear { get; set; }
    public string? Website { get; set; }
}
