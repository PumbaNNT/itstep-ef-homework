using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace ShopMvc.Models;

// Модель форми для створення / редагування товару
public class ProductFormViewModel
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Вкажіть назву")]
    [StringLength(150, ErrorMessage = "Максимум 150 символів")]
    [Display(Name = "Назва")]
    public string Name { get; set; } = string.Empty;

    [StringLength(1000)]
    [Display(Name = "Опис")]
    public string? Description { get; set; }

    [Range(0.01, 1_000_000, ErrorMessage = "Ціна має бути від 0.01 до 1 000 000")]
    [Display(Name = "Ціна, ₴")]
    public decimal Price { get; set; }

    [Range(0, 100_000, ErrorMessage = "Кількість не може бути від'ємною")]
    [Display(Name = "Кількість")]
    public int Amount { get; set; }

    [Range(1.0, 5.0, ErrorMessage = "Рейтинг від 1 до 5")]
    [Display(Name = "Рейтинг")]
    public double Rating { get; set; } = 5;

    [Range(1, int.MaxValue, ErrorMessage = "Оберіть категорію")]
    [Display(Name = "Категорія")]
    public int CategoryId { get; set; }

    // Фото передається файлом
    [Display(Name = "Фото")]
    public IFormFile? ImageFile { get; set; }

    // Поточне фото (для сторінки редагування)
    public string? CurrentImage { get; set; }

    // При редагуванні: видалити фото без заміни
    [Display(Name = "Видалити поточне фото")]
    public bool RemoveImage { get; set; }

    public IEnumerable<SelectListItem> Categories { get; set; } = [];
}
