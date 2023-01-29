

namespace infra.Models.infra
{
    public class Directorate : BaseModel
    {

        [StringLength(150, ErrorMessage = "اسم المنطقة  يجب ان لا يتجاوز 150 حرف")]
        [Required(ErrorMessage = "الرجاء كتابة اسم  المنطقة ")]
        [Display(Name = " اسم المنطقة  ")]
        public string Name { get; set; } =default!;

        [NotMapped]
        public virtual ICollection<School> Schools { get; } = new List<School>();

         [NotMapped]
        public virtual ICollection<ApplicationUser> Users { get; set; } =default!;
    }
}
