


namespace infra.Email.Api
{
    public class ApiMailSettings
    {
        public string apiKey { get; set; } =default!;
        public EmailAddress from { get; set; } =default!;
        public EmailAddress to { get; set; } =default!;
    }
}