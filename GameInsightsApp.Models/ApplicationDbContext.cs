using System;
using GameInsightsApp.Models.Entities;
using GameInsightsApp.Models.TypeConfigurations;
using Microsoft.EntityFrameworkCore;

namespace GameInsightsApp.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<GameEvent> GameEvents { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Player> Players { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(GameEventTypeConfiguration).Assembly);
        }
    }
}
