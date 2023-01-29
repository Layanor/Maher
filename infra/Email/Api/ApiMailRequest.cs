

namespace infra.Email.Api
{
    public class ApiMailRequest
    {

        public string subject { get; set; } =default!;
        public EmailAddress to { get; set; }  =default!;
        public string plainTextContent { get; set; } =default!;

        public string htmlContent { get; set; } =default!;
    }
}