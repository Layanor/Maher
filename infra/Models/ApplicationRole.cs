

namespace infra.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole()
        {

        }
        public ApplicationRole(string roleName) : base(roleName)
        {

        }
        public ApplicationRole(string roleName, string description) : base(roleName)
        {
            Description = description;
        }
        [Required(ErrorMessage = "Role Description is required"), StringLength(250, MinimumLength = 2, ErrorMessage = "Role Description must be between 2 and 250 characters")]
        public string Description { get; set; } = default!;


    }
}
