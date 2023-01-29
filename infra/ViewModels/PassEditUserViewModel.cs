
namespace infra.ViewModels
{
    public class PassEditUserViewModel : EditUserViewModel
    {
        [RegularExpression("^((?=.*[a-z])(?=.*[A-Z])(?=.*\\d)).+$", ErrorMessage = " تاكيد كلمة المرور تتكون من 8 حروف ولا تزيد عن 20 حرف  و  تحوي حرف كبير ورقم على الاقل ورمز ")]
        //  [Required(ErrorMessage = "تأكيد كلمة المرور تتكون من 8 حروف  و  تحوي حرف كبير ورقم على الاقل")]
        //   [StringLength(20, ErrorMessage = "تأكيد كلمة المرور تتكون من 8 حروف  و  تحوي حرف كبير ورقم على الاقل", MinimumLength = 8)]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; } =default!;

        [RegularExpression("^((?=.*[a-z])(?=.*[A-Z])(?=.*\\d)).+$", ErrorMessage = " كلمة المرور تتكون من 8 حروف ولا تزيد عن 20 حرف  و  تحوي حرف كبير ورقم على الاقل ورمز")]
        //  [Required(ErrorMessage = "كلمة المرور تتكون من 8 حروف  و  تحوي حرف كبير ورقم على الاقل")]
        // [StringLength(20, ErrorMessage = "كلمة المرور تتكون من 8 حروف  و  تحوي حرف كبير ورقم على الاقل", MinimumLength = 8)]
        [DataType(DataType.Password)]

        public string NewPassword { get; set; } =default!;

    }
}
