namespace Games.Models;

// Завдання 1: модель гри
public class Game
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;   // назва гри
    public string Studio { get; set; } = string.Empty;  // студія / фірма-створювач
    public string Genre { get; set; } = string.Empty;   // стиль гри
    public DateTime ReleaseDate { get; set; }           // дата релізу

    // Завдання 4: нові поля (додані окремою міграцією)
    public GameMode Mode { get; set; }                  // режим гри
    public long CopiesSold { get; set; }                // кількість проданих копій
}
