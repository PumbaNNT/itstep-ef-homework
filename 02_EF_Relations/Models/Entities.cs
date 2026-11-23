namespace VideoGamesShop.Models;

public class Developer
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;

    public List<Game> Games { get; set; } = new();          // Developer -> Game (one-to-many)
}

public class Game
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int ReleaseYear { get; set; }

    public int DeveloperId { get; set; }
    public Developer Developer { get; set; } = null!;

    public List<OrderItem> OrderItems { get; set; } = new(); // Order <-> Game (many-to-many через OrderItem)
}

public class Customer
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    public List<Order> Orders { get; set; } = new();        // Customer -> Order (one-to-many)
}

public class Order
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;
    public DateTime OrderDate { get; set; }

    public List<OrderItem> OrderItems { get; set; } = new();
}

// Проміжна (join) сутність для зв'язку many-to-many між Order та Game
public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public Order Order { get; set; } = null!;
    public int GameId { get; set; }
    public Game Game { get; set; } = null!;
    public int Quantity { get; set; }
}
