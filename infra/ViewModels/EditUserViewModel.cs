

namespace infra.ViewModels
{
    public class EditUserViewModel
    {
        public string Id { get; set; }  =default!;

        [Required(ErrorMessage = "الرجا ادخال الأسم الثلاثي")]
        [Display(Name = " الأسم الثلاثي  ")]
        public string FullName { get; set; } =default!;


        [Required(ErrorMessage = "يرجى كتابة البريد الالكتروني   للمدرسة")]
        [EmailAddress]
        [StringLength(50, ErrorMessage = "الرجاء كتابة البريد الالكتروني   للمدرسة  ", MinimumLength = 5)]
        [Remote("EmailAlreadyExistsAsync", "UserAdmin", ErrorMessage = "البريد الالكتروني مستخدم في أنشاء حساب آخر. الرجاء استعادة كلمة المرور         ")]

        [Display(Name = "البريد الالكتروني الرسمي  للمدرسة")]
        public string Email { get; set; } =default!;        public bool IsEnabled { get; set; } = true;

        public bool IsLockedOut { get; set; }
        public int Dir { get; set; }

        public List<int> School { get; set; } =default!;
        public List<int> Directores { get; set; } =default!;
        public int usertype { get; set; }
      
    }
}
