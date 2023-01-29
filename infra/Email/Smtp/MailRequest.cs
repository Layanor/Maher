



namespace infra.Email.Smtp;

public class MailRequest
{
    public string ToEmail { get; set; } = "apiexcep@gmail.com";
    public string Subject { get; set; } =default!;
    public string Body { get; set; } =default!;
    public List<IFormFile> Attachments { get; set; } =default!;
}
