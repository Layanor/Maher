

namespace infra.Models.infra
{
    public class evaluation: BaseModel
    {

        [StringLength(150, ErrorMessage = "  بند التقيم   يجب ان لا يتجاوز 150 حرف")]
        [Required(ErrorMessage = "الرجاء كتابة  بند التقييم  ")]
        [Display(Name = "  بند  التقييم  ")]
        public string Name { get; set; } =default!;
   }
}
