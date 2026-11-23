namespace ShopMvc.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Amount { get; set; }
    public double Rating { get; set; }   // 1.0 - 5.0
    public string? Image { get; set; }

    public int CategoryId { get; set; }
    public Category? Category { get; set; }
}
