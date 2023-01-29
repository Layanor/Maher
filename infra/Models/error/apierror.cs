


namespace infra.Models.error;

public class ApiError : BaseModel
{
    public int StatusCode { get; set; }
    public string Message { get; set; } = default!;
    public bool IsError { get; set; }
    public string Detail { get; set; } = default!;
    public string StackTrace { get; set; } = default!;
    public string Type { get; set; } = default!;

    [NotMapped]
    public List<ValidationError> ModelStateErrors { get; set; } = new List<ValidationError>();

    public override string ToString()
    {
        var option = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
        return System.Text.Json.JsonSerializer.Serialize(this, option);
    }

    public ApiError(string message)
    {
        StatusCode = 500;
        Message = message ?? GetDefultMessageForStatusCode(StatusCode);
        IsError = true;
        ModelStateErrors = null;
        StackTrace = null;
        Type = null;

    }
    public ApiError(Microsoft.Extensions.Logging.ILogger _logger, string message)
    {
        StatusCode = 500;
        Message = message ?? GetDefultMessageForStatusCode(StatusCode);
        IsError = true;
        ModelStateErrors = null;
        StackTrace = null;
        Type = null;
        LogContext.PushProperty("Detalis", this);
        _logger.LogError($"Exception occur: {message}");

    }
    public ApiError(Microsoft.Extensions.Logging.ILogger _logger, string message, int statusCode)
    {
        Message = message ?? GetDefultMessageForStatusCode(statusCode);
        IsError = true;
        ModelStateErrors = null;
        StatusCode = statusCode;
        StackTrace = null;
        Type = null;
        LogContext.PushProperty("Detalis", this);
        _logger.LogError($"Exception occur: {message}");

    }
    public ApiError(Microsoft.Extensions.Logging.ILogger _logger, string message, int statusCode, string details)
    {
        Detail = details;
        IsError = true;
        StatusCode = statusCode;
        ModelStateErrors = null;
        Message = message ?? GetDefultMessageForStatusCode(statusCode);
        StackTrace = null;
        Type = null;
        LogContext.PushProperty("Detalis", this);
        _logger.LogError($"Exception occur: {message}");
    }
    public ApiError(Microsoft.Extensions.Logging.ILogger _logger, string message, int statusCode, string details, string stackTrace)
    {
        Detail = details;
        IsError = true;
        StatusCode = statusCode;
        ModelStateErrors = null;
        Message = message ?? GetDefultMessageForStatusCode(statusCode);
        StackTrace = stackTrace;
        Type = null;
        LogContext.PushProperty("Detalis", this);
        _logger.LogError($"Exception occur: {message}");

    }

    public ApiError(Microsoft.Extensions.Logging.ILogger _logger, string message, int statusCode, string details, string stackTrace, string type)
    {
        Detail = details;
        IsError = true;
        StatusCode = statusCode;
        ModelStateErrors = null;
        Message = message ?? GetDefultMessageForStatusCode(statusCode);
        StackTrace = stackTrace;
        Type = type;
        LogContext.PushProperty("Detalis", this);
        _logger.LogError($"Exception occur: {message}");
    }
    public ApiError(Microsoft.Extensions.Logging.ILogger _logger, ModelStateDictionary modelState)
    {

        StatusCode = 400;
        Detail = null;
        IsError = true;
        Message = "الرجاء التأكد من البيانات المرسلة واعادة المحاولة";
        StackTrace = null;
        Type = null;
        ModelStateErrors = modelState.Keys
                .SelectMany(key => modelState[key]!.Errors.Select(x => new ValidationError(key, x.ErrorMessage)))
                .ToList();
        LogContext.PushProperty("Detalis", this);
        _logger.LogError($"Exception occur: {modelState}");
    }
    private string GetDefultMessageForStatusCode(int statusCode)
    {
        return statusCode switch
        {
            400 => "الرجاء التأكد من البيانات المرسلة - 400",
            401 => "الرجاء تسجيل الدخول - لاتملك صلاحية - 401",
            403 => "الرجاء تسجيل الدخول بحساب اخر - 403",
            404 => "لم يتم العثور على الصفحة - 404",
            500 => "الرجاء اعادة المحاولة لاحقا - خطاء بالسرفر  - 500",
            _ => "خطاء غير معروف",

        };

    }



}