using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlaylistApi.Models;

namespace PlaylistApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistItemsController : ControllerBase
    {
        private readonly PlaylistContext _context;

        public PlaylistItemsController(PlaylistContext context)
        {
            _context = context;
        }

        // GET: api/PlaylistItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlaylistItem>>> GetTodoItems()
        {
            return await _context.TodoItems.ToListAsync();
        }

        // GET: api/PlaylistItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlaylistItem>> GetPlaylistItem(long id)
        {
            var playlistItem = await _context.TodoItems.FindAsync(id);

            if (playlistItem == null)
            {
                return NotFound();
            }

            return playlistItem;
        }

        // PUT: api/PlaylistItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlaylistItem(long id, PlaylistItem playlistItem)
        {
            if (id != playlistItem.id)
            {
                return BadRequest();
            }

            _context.Entry(playlistItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaylistItemExists(id))
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

        // POST: api/PlaylistItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PlaylistItem>> PostPlaylistItem(PlaylistItem playlistItem)
        {
            _context.TodoItems.Add(playlistItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlaylistItem", new { id = playlistItem.id }, playlistItem);
        }

        // DELETE: api/PlaylistItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PlaylistItem>> DeletePlaylistItem(long id)
        {
            var playlistItem = await _context.TodoItems.FindAsync(id);
            if (playlistItem == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(playlistItem);
            await _context.SaveChangesAsync();

            return playlistItem;
        }

        private bool PlaylistItemExists(long id)
        {
            return _context.TodoItems.Any(e => e.id == id);
        }
    }
}
