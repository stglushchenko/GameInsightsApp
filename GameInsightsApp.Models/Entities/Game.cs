using System.Collections.Generic;

namespace GameInsightsApp.Models.Entities
{
    public class Game
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SpectatorEmployeeName { get; set; }
        public ICollection<Team> Teams { get; set; }
    }
}