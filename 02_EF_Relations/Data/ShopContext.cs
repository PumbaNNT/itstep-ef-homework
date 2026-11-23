using Microsoft.EntityFrameworkCore;
using VideoGamesShop.Models;

namespace VideoGamesShop.Data;

public class ShopContext : DbContext
{
    public DbSet<Developer> Developers => Set<Developer>();
    public DbSet<Game> Games => Set<Game>();
    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
        optionsBuilder.UseSqlServer(
            @"Server=(localdb)\MSSQLLocalDB;Database=VideoGamesShop;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder mb)
    {
        // Developer -> Game (one-to-many)
        mb.Entity<Developer>(e =>
        {
            e.Property(d => d.Name).HasMaxLength(100).IsRequired();
            e.Property(d => d.Country).HasMaxLength(60).IsRequired();
            e.HasMany(d => d.Games)
             .WithOne(g => g.Developer)
             .HasForeignKey(g => g.DeveloperId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        mb.Entity<Game>(e =>
        {
            e.Property(g => g.Title).HasMaxLength(100).IsRequired();
            e.Property(g => g.Price).HasPrecision(10, 2);
        });

        // Customer -> Order (one-to-many)
        mb.Entity<Customer>(e =>
        {
            e.Property(c => c.FullName).HasMaxLength(100).IsRequired();
            e.Property(c => c.Email).HasMaxLength(100).IsRequired();
            e.HasIndex(c => c.Email).IsUnique();
            e.HasMany(c => c.Orders)
             .WithOne(o => o.Customer)
             .HasForeignKey(o => o.CustomerId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // Order <-> Game (many-to-many) через OrderItem
        mb.Entity<OrderItem>(e =>
        {
            e.HasOne(oi => oi.Order).WithMany(o => o.OrderItems)
             .HasForeignKey(oi => oi.OrderId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne(oi => oi.Game).WithMany(g => g.OrderItems)
             .HasForeignKey(oi => oi.GameId).OnDelete(DeleteBehavior.Restrict);
        });
    }
}
