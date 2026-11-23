namespace ShopMvc.Services;

// Збереження / видалення фото товарів у wwwroot/images/products
public class ImageService(IWebHostEnvironment env)
{
    private const string Folder = "images/products";
    private static readonly string[] AllowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    public const long MaxSize = 5 * 1024 * 1024; // 5 МБ

    public static bool IsAllowed(IFormFile file) =>
        AllowedExtensions.Contains(Path.GetExtension(file.FileName).ToLowerInvariant());

    // Зберігає файл з унікальною назвою і повертає шлях для <img src>
    public async Task<string> SaveAsync(IFormFile file)
    {
        var dir = Path.Combine(env.WebRootPath, Folder);
        Directory.CreateDirectory(dir);

        var fileName = $"{Guid.NewGuid():N}{Path.GetExtension(file.FileName).ToLowerInvariant()}";
        await using var stream = File.Create(Path.Combine(dir, fileName));
        await file.CopyToAsync(stream);

        return $"/{Folder}/{fileName}";
    }

    // Видаляє попереднє зображення (тільки локальні файли, зовнішні URL з сідера не чіпаємо)
    public void Delete(string? imagePath)
    {
        if (string.IsNullOrWhiteSpace(imagePath) || !imagePath.StartsWith($"/{Folder}/"))
            return;

        var fullPath = Path.Combine(env.WebRootPath, imagePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));
        if (File.Exists(fullPath))
            File.Delete(fullPath);
    }
}
