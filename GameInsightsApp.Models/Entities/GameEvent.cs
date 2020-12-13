using System;
using System.Collections.Generic;
using System.Text;
using GameInsightsApp.Models.Enums;

namespace GameInsightsApp.Models.Entities
{
    public class GameEvent
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public int? PlayerId { get; set; }
        public int? TeamId { get; set; }
        public GameEventType EventType { get; set; }
        public string Notes { get; set; }
    }
}
