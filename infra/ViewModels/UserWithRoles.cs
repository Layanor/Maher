

namespace infra.ViewModels
{
    public class UserWithRoles
    {
      
        public string Id { get; set; } =default!;
        public int DirectorateId { get; set; }
        public string Email { get; set; } =default!;
        public string FullName { get; set; } =default!;
        public List<string> Roles { get; set; } =default!;
        public List<int> UsersSchool { get; set; } =default!;
        public List<int> userstypes { get; set; } =default!;


    }
}
