

namespace infra.Models.infra
{
    public class Usersclassroom
    {
        public string ApplicationUserId { get; set; } =default!;
        public ApplicationUser ApplicationUser { get; set; } =default!;
        public int classroomsId { get; set; }
        public classroom classrooms { get; set; } =default!;
    }
}
