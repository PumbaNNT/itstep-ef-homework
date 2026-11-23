using Games.Models;
using Microsoft.EntityFrameworkCore;

namespace Games.Data;

// Завдання 2: клас-спадкоємець від DbContext
public class GamesContext : DbContext
{
    public DbSet<Game> Games => Set<Game>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(
                @"Server=(localdb)\MSSQLLocalDB;Database=GamesEFIntro;Trusted_Connection=True;TrustServerCertificate=True");
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Game>(e =>
        {
            e.Property(g => g.Title).HasMaxLength(100).IsRequired();
            e.Property(g => g.Studio).HasMaxLength(100).IsRequired();
            e.Property(g => g.Genre).HasMaxLength(50).IsRequired();
        });
    }
}
