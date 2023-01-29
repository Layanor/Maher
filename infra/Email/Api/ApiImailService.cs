


namespace infra.Email.Api
{
    public interface ApiImailService
    {
        Task SendEmailAsync(ApiMailRequest apimailRequest);
    }
    public class ApimailService : ApiImailService
    {
        private readonly ILogger<ApimailService> _logger;
        private readonly ApiMailSettings _mailSettings;
        public ApimailService(IOptions<ApiMailSettings> mailSettings, ILogger<ApimailService> logger)
        {
            _mailSettings = mailSettings.Value;
            _logger = logger;
        }
        public async Task SendEmailAsync(ApiMailRequest mailRequest)
        {
            try
            {
                var apiKey = _mailSettings.apiKey;
                var client = new SendGridClient(apiKey);
                var from = _mailSettings.from;
                var subject = mailRequest.subject;
                var to = _mailSettings.to;
                if (mailRequest.to != null)
                {
                    to = mailRequest.to;
                }
                var plainTextContent = mailRequest.plainTextContent;
                var htmlContent = mailRequest.htmlContent;
                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                var status = await client.SendEmailAsync(msg);
                if (!status.IsSuccessStatusCode)
                {
                    _logger.LogError($"Send Mail Exception occur: {System.Text.Json.JsonSerializer.Serialize(status)}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Send Mail Exception occur: {ex}");
                throw;
            }
        }

    }
}