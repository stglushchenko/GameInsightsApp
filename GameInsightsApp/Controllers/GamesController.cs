using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameInsightsApp.Models;
using GameInsightsApp.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace GameInsightsApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GamesController : ControllerBase
    {

        private readonly ILogger<GamesController> logger;
        private readonly ApplicationDbContext context;

        public GamesController(ILogger<GamesController> logger, ApplicationDbContext context)
        {
            logger = logger;
            this.context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Game>> Get()
        {
            return await context.Games
                .Include(x => x.Teams)
                .ThenInclude(x => x.Players)
                .AsNoTracking()
                .ToArrayAsync();
        }

        [HttpGet("{id}")]
        public async Task<Game> Get(int id)
        {
            return await context.Games
                .Include(x => x.Teams)
                .ThenInclude(x => x.Players)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
