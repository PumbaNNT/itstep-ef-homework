using GamesCatalog.Models;
using Microsoft.EntityFrameworkCore;

namespace GamesCatalog.Data;

public class CatalogContext : DbContext
{
    public DbSet<Game> Games => Set<Game>();
    public DbSet<Genre> Genres => Set<Genre>();
    public DbSet<Publisher> Publishers => Set<Publisher>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
        optionsBuilder.UseSqlServer(
            @"Server=(localdb)\MSSQLLocalDB;Database=GamesCatalogEF;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder mb)
    {
        mb.Entity<Publisher>(e =>
        {
            e.Property(p => p.Name).HasMaxLength(100).IsRequired();
            e.Property(p => p.Country).HasMaxLength(60);
            e.Property(p => p.Website).HasMaxLength(200);
            // Games <-> Publishers (One to Many)
            e.HasMany(p => p.Games)
             .WithOne(g => g.Publisher)
             .HasForeignKey(g => g.PublisherId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        mb.Entity<Genre>(e =>
        {
            e.Property(g => g.Name).HasMaxLength(50).IsRequired();
            e.HasIndex(g => g.Name).IsUnique();
        });

        mb.Entity<Game>(e =>
        {
            e.Property(g => g.Title).HasMaxLength(100).IsRequired();
            e.Property(g => g.Description).HasMaxLength(500);
            e.Property(g => g.Price).HasPrecision(10, 2);
            // Games <-> Genres (Many to Many), проміжна таблиця GameGenres
            e.HasMany(g => g.Genres)
             .WithMany(gn => gn.Games)
             .UsingEntity(j => j.ToTable("GameGenres"));
        });
    }
}
