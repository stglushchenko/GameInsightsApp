using System;
using GameInsightsApp.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace GameInsightsApp.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }
        public DbSet<GameEvent> GameEvents { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Player> Players { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Team>()
        //        .HasData(new[]
        //                 {
        //                     new Team {Id = 1, Name = "Team Red"},
        //                     new Team {Id = 2, Name = "Team Blue"},
        //                     new Team {Id = 3, Name = "Team Green"}
        //                 });
        //    modelBuilder.Entity<Player>()
        //        .HasData(new[]
        //                 {
        //                     new Player {Id = 1, Name = "Player 1", TeamId = 1},
        //                     new Player {Id = 2, Name = "Player 2", TeamId = 1},
        //                     new Player {Id = 3, Name = "Player 3", TeamId = 1},
        //                     new Player {Id = 4, Name = "Player 4", TeamId = 1},
        //                     new Player {Id = 5, Name = "Player 5", TeamId = 2},
        //                     new Player {Id = 6, Name = "Player 6", TeamId = 2},
        //                     new Player {Id = 7, Name = "Player 7", TeamId = 3},
        //                     new Player {Id = 8, Name = "Player 8", TeamId = 3},
        //                     new Player {Id = 9, Name = "Player 9", TeamId = 3},
        //                 });
        //    modelBuilder.Entity<Game>()
        //        .HasData(new[]
        //                 {
        //                     new Game {Id = 1, Name = "Game 1", SpectatorEmployeeName = "John Smith"},
        //                     new Game {Id = 2, Name = "Game 2", SpectatorEmployeeName = "Jack Smith"},
        //                     new Game {Id = 3, Name = "Game 3", SpectatorEmployeeName = "James Smith"},
        //                 });
        //    modelBuilder.Entity<Game>()
        //        .HasMany<Team>(g => g.Teams)
        //        .WithMany(g => g.Games)
        //        .UsingEntity(j => j.HasData(new object[]
        //                                    {
        //                                        new {GameId = 1, TeamId = 1},
        //                                        new {GameId = 1, TeamId = 2},
        //                                        new {GameId = 2, TeamId = 1},
        //                                        new {GameId = 2, TeamId = 3},
        //                                        new {GameId = 3, TeamId = 2},
        //                                        new {GameId = 3, TeamId = 3},
        //                                    }));
        //}
    }
}
