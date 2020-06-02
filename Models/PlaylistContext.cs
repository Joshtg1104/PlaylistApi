using Microsoft.EntityFrameworkCore;

namespace PlaylistApi.Models
{
    public class PlaylistContext : DbContext
    {
        public PlaylistContext(DbContextOptions<PlaylistContext> options)
            : base(options)
        {
        }

        public DbSet<PlaylistItem> TodoItems { get; set; }
    }
}