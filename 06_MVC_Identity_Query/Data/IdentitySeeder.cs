using Microsoft.AspNetCore.Identity;
using ShopMvc.Models;

namespace ShopMvc.Data;

// Створює ролі Admin / User та тестових користувачів (дані з appsettings.json -> "SeedUsers")
public static class IdentitySeeder
{
    public static async Task SeedAsync(IServiceProvider services, IConfiguration config)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<IdentityUser>>();

        foreach (var role in new[] { Roles.Admin, Roles.User })
        {
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));
        }

        await EnsureUserAsync(userManager, config["SeedUsers:Admin:Email"], config["SeedUsers:Admin:Password"], Roles.Admin);
        await EnsureUserAsync(userManager, config["SeedUsers:User:Email"], config["SeedUsers:User:Password"], Roles.User);
    }

    private static async Task EnsureUserAsync(UserManager<IdentityUser> userManager, string? email, string? password, string role)
    {
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password)) return;
        if (await userManager.FindByEmailAsync(email) is not null) return;

        var user = new IdentityUser { UserName = email, Email = email, EmailConfirmed = true };
        var result = await userManager.CreateAsync(user, password);
        if (result.Succeeded)
            await userManager.AddToRoleAsync(user, role);
    }
}
