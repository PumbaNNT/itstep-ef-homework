using System.Text.Json;

namespace ShopMvc.Services;

// Позиція кошика, яка зберігається в сесії
public class CartItem
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}

// Кошик у сесії: список CartItem серіалізується в JSON під ключем "Cart"
public class CartService(IHttpContextAccessor accessor)
{
    private const string SessionKey = "Cart";

    private ISession Session => accessor.HttpContext!.Session;

    public List<CartItem> GetItems()
    {
        var json = Session.GetString(SessionKey);
        return string.IsNullOrEmpty(json)
            ? new List<CartItem>()
            : JsonSerializer.Deserialize<List<CartItem>>(json) ?? new List<CartItem>();
    }

    public int Count => GetItems().Sum(i => i.Quantity);

    public void Add(int productId, int quantity = 1)
    {
        var items = GetItems();
        var item = items.FirstOrDefault(i => i.ProductId == productId);
        if (item is null)
            items.Add(new CartItem { ProductId = productId, Quantity = quantity });
        else
            item.Quantity += quantity;
        Save(items);
    }

    // Змінити кількість на delta (+1 / -1). Якщо к-сть < 1 - товар видаляється з кошика
    public void ChangeQuantity(int productId, int delta)
    {
        var items = GetItems();
        var item = items.FirstOrDefault(i => i.ProductId == productId);
        if (item is null) return;

        item.Quantity += delta;
        if (item.Quantity < 1)
            items.Remove(item);
        Save(items);
    }

    public void Remove(int productId)
    {
        var items = GetItems();
        items.RemoveAll(i => i.ProductId == productId);
        Save(items);
    }

    public void Clear() => Session.Remove(SessionKey);

    private void Save(List<CartItem> items) =>
        Session.SetString(SessionKey, JsonSerializer.Serialize(items));
}
