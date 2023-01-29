

namespace infra.Models.infra
{
    public class SchoolType : BaseModel
    {

        [StringLength(150, ErrorMessage = "نوع المدرسة   يجب ان لا يتجاوز 150 حرف")]
        [Required(ErrorMessage = "الرجاء كتابة نوع المدرسة  ")]
        [Display(Name = " نوع المدرسة  ")]
        public string Name { get; set; } =default!;

        [NotMapped]
        public virtual ICollection<School> Schools { get; } = new List<School>();

    }
}
