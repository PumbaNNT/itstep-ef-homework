using GamesApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace GamesApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Developer> Developers => Set<Developer>();
    public DbSet<Game> Games => Set<Game>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        mb.Entity<Developer>(e =>
        {
            e.Property(d => d.Name).HasMaxLength(100).IsRequired();
            e.Property(d => d.Country).HasMaxLength(60).IsRequired();
            e.Property(d => d.Website).HasMaxLength(200);
            e.HasMany(d => d.Games)
             .WithOne(g => g.Developer)
             .HasForeignKey(g => g.DeveloperId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        mb.Entity<Game>(e =>
        {
            e.Property(g => g.Title).HasMaxLength(100).IsRequired();
            e.Property(g => g.Price).HasPrecision(10, 2);
        });
    }
}
