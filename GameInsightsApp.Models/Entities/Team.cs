using System.Collections.Generic;

namespace GameInsightsApp.Models.Entities
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Player> Players { get; set; }
    }
}