namespace ShopMvc.Models;

public class CartLineViewModel
{
    public Product Product { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal LineTotal => Product.Price * Quantity;
}

public class CartViewModel
{
    public List<CartLineViewModel> Lines { get; set; } = new();

    // Загальна сума всіх товарів у кошику
    public decimal Total => Lines.Sum(l => l.LineTotal);
    public int TotalQuantity => Lines.Sum(l => l.Quantity);
}
