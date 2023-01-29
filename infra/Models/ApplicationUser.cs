
namespace infra.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required(ErrorMessage = "الرجا ادخال الأسم الثلاثي")]
        [Display(Name = " الأسم الثلاثي  ")]
        public string FullName { get; set; } = default!;

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



        [NotMapped]
        [ForeignKey("DirectorateId")]
        public Directorate Directorate { get; set; } = default!;

        [Required(ErrorMessage = "الرجا أختيار المنطقة")]
        [Display(Name = " الرجا أختيار المنطقة ")]
        public int DirectorateId { get; set; }



        [NotMapped]
        [ForeignKey("UserTypeId")]
        public UserType usertype { get; set; } = default!;

        [Required(ErrorMessage = "الرجاء أختيار نوع المستخدم   ")]
        [Display(Name = "   نوع المستخدم")]
        public int UserTypeId { get; set; }


        [NotMapped]
        public virtual ICollection<IdentityUserRole<string>> Roles { get; set; } = new List<IdentityUserRole<string>>();
        public bool IsEnabled { get; set; }

        [NotMapped]
        public ICollection<Usersclassroom> Usersclassrooms { get; set; } = default!;

        [NotMapped]
        public virtual ICollection<usersedumaterial> usersedumaterials { get; } = new List<usersedumaterial>();
        [NotMapped]
        public ICollection<UsersSchool> UsersSchools { get; set; } = default!;




    }
}
