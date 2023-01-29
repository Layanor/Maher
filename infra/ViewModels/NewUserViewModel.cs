

namespace infra.ViewModels
{
    public class NewUserViewModel
    {
        public string Id { get; set; }  =default!;

        [Required(ErrorMessage = "الرجا ادخال الأسم الثلاثي")]
        [Display(Name = " الأسم الثلاثي  ")]
        public string FullName { get; set; } =default!;


        [Required(ErrorMessage = "يرجى كتابة البريد الالكتروني   ")]
        [EmailAddress]
        [StringLength(50, ErrorMessage = "الرجاء كتابة البريد الالكتروني     ", MinimumLength = 5)]
        [Remote("EmailAlreadyExistsAsync", "UserAdmin", ErrorMessage = "البريد الالكتروني مستخدم في أنشاء حساب آخر. الرجاء استعادة كلمة المرور         ")]

        [Display(Name = "البريد الالكتروني   ")]
        public string Email { get; set; } =default!;

        [RegularExpression("^((?=.*[a-z])(?=.*[A-Z])(?=.*\\d)).+$", ErrorMessage = " كلمة المرور تتكون من 8 حروف  و  تحوي حرف كبير ورقم على الاقل")]
        [Required(ErrorMessage = "كلمة المرور تتكون من 8 حروف  و  تحوي حرف كبير ورقم على الاقل")]
        [StringLength(20, ErrorMessage = "كلمة المرور تتكون من 8 حروف  و  تحوي حرف كبير ورقم على الاقل", MinimumLength = 8)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; } =default!;

        [Required(ErrorMessage = "كلمة المرور وتأكيد كلمة المرور غير متطابقتان")]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "كلمة المرور وتأكيد كلمة المرور غير متطابقتان")]
        public string ConfirmPassword { get; set; } =default!;

   [Display(Name = "رقم جوال للتواصل")]
        [Required(ErrorMessage = "الرجاء كتابة رقم جوال للتواصل")]
        [DataType(DataType.PhoneNumber)]
        [MaxLength(10, ErrorMessage = "الرجاء كتابة رقم جوال للتواصل لا يزيد عن 10 ارقام")]
        [MinLength(10, ErrorMessage = "الرجاء كتابة رقم جوال للتواصل لا يقل عن 10 ارقام")]
        public string UserPhone { get; set; } = default!;

        [Display(Name = "رقم الاثبات ")]
        [Required(ErrorMessage = "الرجاء كتابة رقم الاثبات")]
        [RegularExpression(@"[0-9]{10}$", ErrorMessage = "رقم الاثبات مكون من  10 خانات")]
        [MaxLength(10, ErrorMessage = "الرجاء كتابة رقم  الهوية لا يزيد عن 10 ارقام")]
        [MinLength(10, ErrorMessage = "الرجاء كتابة رقم  الهوية لا يقل عن 10 ارقام")]
        public long IdNumber { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        [Required(ErrorMessage = " تاريخ   الميلاد ")]
        [Display(Name = " تاريخ ادخال الميلاد    ")]
        public DateTime EnterDateTime { get; set; }
          public List<int> Usersclassrooms { get; set; } =default!;
         public List<int> Usersedumatrials { get; set; } =default!;

      
        public int Dirid { get; set; }
            public int schoolid { get; set; }
        public int UserType { get; set; }


    }
}
