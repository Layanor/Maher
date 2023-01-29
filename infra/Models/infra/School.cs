

namespace infra.Models.infra
{
    public class School : BaseModel
    {

        [StringLength(150, ErrorMessage = "اسم المدرسة   يجب ان لا يتجاوز 150 حرف")]
        [Required(ErrorMessage = "الرجاء كتابة اسم المدرسة  ")]
        [Display(Name = " اسم المدرسة  ")]
        public string Name { get; set; } = default!;


        [NotMapped]
        [ForeignKey("DirectorateId")]
        public Directorate Directorate { get; set; } = default!;


        [Required(ErrorMessage = "الرجا أختيار المنطقة")]
        [Display(Name = " الرجا أختيار المنطقة ")]
        public int DirectorateId { get; set; }

        [NotMapped]
        [ForeignKey("SchoolTypesId")]
        public SchoolType SchoolTypes { get; set; } = default!;


        [Required(ErrorMessage = "الرجاء أختيار تصنيف المدرسة  ")]
        [Display(Name = " تصنيف  المدرسة")]
        public int SchoolTypesId { get; set; }

        [Required(ErrorMessage = "يرجى كتابة البريد الالكتروني   للمدرسة    ")]
        [EmailAddress]
        [StringLength(50, ErrorMessage = "البريد الالكتروني    للمدرسة لا يزيد عن 50 حرف  ", MinimumLength = 5)]


        [Display(Name = "البريد الالكتروني للمدرسة ")]
        public string Email { get; set; } = default!;


        public ICollection<UsersSchool> UsersSchools { get; set; } = default!;




    }
}
