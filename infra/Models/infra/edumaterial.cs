

namespace infra.Models.infra
{
    public class edumaterial : BaseModel
    {

        [StringLength(150, ErrorMessage = "  المادة التعليمية   يجب ان لا يتجاوز 150 حرف")]
        [Required(ErrorMessage = "الرجاء كتابة  المادة التعليمية   ")]
        [Display(Name = "المادة التعليمية ")]
        public string Name { get; set; } = default!;

        [NotMapped]
        public virtual ICollection<usersedumaterial> usersedumaterials { get; } = new List<usersedumaterial>();

    }
}
