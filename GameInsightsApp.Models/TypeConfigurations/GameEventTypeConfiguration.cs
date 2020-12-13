using GameInsightsApp.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GameInsightsApp.Models.TypeConfigurations
{
    public class GameEventTypeConfiguration : IEntityTypeConfiguration<GameEvent>
    {
        public void Configure(EntityTypeBuilder<GameEvent> builder)
        {
            
        }
    }
}