
namespace infra.ViewModels
{
    public class UserwiteRolesViewModel
    {
        public string Id { get; set; } =default!;
        public string FullName { get; set; } =default!;
        public string Email { get; set; } =default!;
          public long IdNumber { get; set; } =default!;
            public int age { get; set; } =default!;
        
         public string userphone { get; set; } =default!;
        public List<string> Schools { get; set; } =default!;
        public List<string> Usersclassrooms { get; set; } =default!;
         public List<string> Usersedumatrials { get; set; } =default!;
        public List<string> RolesDes { get; set; } =default!;
        public bool emailConfirmed { get; set; }
        public bool isEnabled { get; set; }

    }

    public class Helthfac
    {
        public int value { get; set; }
        public string text { get; set; } =default!;

    }
}
