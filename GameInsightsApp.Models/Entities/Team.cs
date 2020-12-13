using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GameInsightsApp.Models.Entities
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Player> Players { get; set; }

        [JsonIgnore]
        public ICollection<Game> Games { get; set; }
    }
}