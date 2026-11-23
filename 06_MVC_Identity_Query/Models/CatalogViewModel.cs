namespace ShopMvc.Models;

public class CatalogViewModel
{
    public string? Sort { get; set; }
    public int TotalProducts { get; set; }

    // Без сортування - товари згруповані за категоріями
    public List<Category> Categories { get; set; } = new();

    // З сортуванням - один відсортований список
    public List<Product> SortedProducts { get; set; } = new();

    public static readonly (string Value, string Text)[] SortOptions =
    [
        ("", "За категоріями"),
        ("price_asc", "Ціна: від дешевих"),
        ("price_desc", "Ціна: від дорогих"),
        ("name", "Назва: А-Я"),
        ("rating", "Рейтинг: від найбільшого"),
    ];
}
