

namespace infra.Email.Smtp;

public class SmtpMailSettings
{
    public string Username { get; set; } =default!;
    public string FromMail { get; set; } =default!;
    public string DisplayName { get; set; } =default!;
    public string Password { get; set; } =default!;
    public string Host { get; set; } =default!;
    public int Port { get; set; } =default!;
}
