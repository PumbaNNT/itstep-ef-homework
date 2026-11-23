namespace GamesCatalog.Models;

public class Publisher
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public int FoundedYear { get; set; }
    public string Website { get; set; } = string.Empty;

    // Publishers -> Games (one-to-many)
    public List<Game> Games { get; set; } = new();

    public override string ToString() => $"[{Id}] {Name} ({Country}, {FoundedYear}) {Website}";
}

public class Genre
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    // Genres <-> Games (many-to-many)
    public List<Game> Games { get; set; } = new();

    public override string ToString() => $"[{Id}] {Name}";
}

public class Game
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public DateTime ReleaseDate { get; set; }

    public int PublisherId { get; set; }
    public Publisher Publisher { get; set; } = null!;

    public List<Genre> Genres { get; set; } = new();

    public override string ToString() => $"[{Id}] {Title} - {Price:F2}$, {ReleaseDate:dd.MM.yyyy}";
}
