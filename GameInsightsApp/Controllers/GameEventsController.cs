using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GameInsightsApp.Models;
using GameInsightsApp.Models.Entities;

namespace GameInsightsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameEventsController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public GameEventsController(ApplicationDbContext context)
        {
            this.context = context;
        }

        // GET: api/GameEvents?gameId=5
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameEvent>>> GetGameEvents(int gameId)
        {
            return await context.GameEvents.Where(x => x.GameId == gameId).ToListAsync();
        }

        // GET: api/GameEvents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GameEvent>> GetGameEvent(int id)
        {
            var gameEvent = await context.GameEvents.FindAsync(id);

            if (gameEvent == null)
            {
                return NotFound();
            }

            return gameEvent;
        }

        // PUT: api/GameEvents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGameEvent(int id, GameEvent gameEvent)
        {
            if (id != gameEvent.Id)
            {
                return BadRequest();
            }

            context.Entry(gameEvent).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameEventExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/GameEvents
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GameEvent>> PostGameEvent(GameEvent gameEvent)
        {
            context.GameEvents.Add(gameEvent);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetGameEvent", new { id = gameEvent.Id }, gameEvent);
        }

        // DELETE: api/GameEvents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGameEvent(int id)
        {
            var gameEvent = await context.GameEvents.FindAsync(id);
            if (gameEvent == null)
            {
                return NotFound();
            }

            context.GameEvents.Remove(gameEvent);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool GameEventExists(int id)
        {
            return context.GameEvents.Any(e => e.Id == id);
        }
    }
}
