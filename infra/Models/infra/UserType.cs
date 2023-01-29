
namespace infra.Models.infra
{
    public class UserType :BaseModel
    {
       

        [Required(ErrorMessage = "الرجاء كتابة نوع المستخدم"), StringLength(250, MinimumLength = 2, ErrorMessage = " نوع المستخدم من 2 الى 250 حرف")]
        public string Name { get; set; } =default!;
        [NotMapped]
        public ICollection<ApplicationUser> ApplicationUsers { get; set; } =default!;
    }
}
