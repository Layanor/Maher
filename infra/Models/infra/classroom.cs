
namespace infra.Models.infra
{
    public class classroom : BaseModel
    {

        [StringLength(150, ErrorMessage = " الفصل الدراسي   يجب ان لا يتجاوز 150 حرف")]
        [Required(ErrorMessage = "الرجاء كتابة  الفصل الدراسي  ")]
        [Display(Name = "  الفصل الدراسي  ")]
        public string Name { get; set; } =default!;
    [NotMapped]
        public virtual ICollection<Usersclassroom> Usersclassrooms { get; } = new List<Usersclassroom>();

    }
}
