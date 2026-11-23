using System.Text.Json.Serialization;

namespace GamesApi.Entities;

public class Game
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int ReleaseYear { get; set; }

    public int DeveloperId { get; set; }

    [JsonIgnore] // щоб не було циклу Developer -> Games -> Developer у JSON
    public Developer? Developer { get; set; }
}
