
namespace infra.Models.error.MiddleWare
{

    public class CustomErrorMiddleWare
    {
        private const string ErrorEmailAddress = "arabmed@gmail.com";

        private readonly RequestDelegate _next;
        private readonly ILogger<CustomErrorMiddleWare> _logger;
        private IWebHostEnvironment _hostingEnvironment;
        private readonly ApiImailService _apimailService;
        public CustomErrorMiddleWare(ApiImailService apimailService, RequestDelegate next, ILogger<CustomErrorMiddleWare> logger,
         IWebHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _hostingEnvironment = env;
            this._apimailService = apimailService;

        }
        public async Task InvokeAsync(HttpContext httpContext,
         IUnitOfWork unitOfWork)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                if (ex != null)
                {

                    _logger.LogError($"Exception occur: {ex}");
                    var err = new ApiError(_logger, ex.Message, Convert.ToInt32(HttpStatusCode.InternalServerError), ex.GetBaseException().ToString(), ex.StackTrace!, ex.GetType().ToString());
                    unitOfWork.Repository<ApiError>().Add(err);
                    await unitOfWork.Complete();
                    await HandleExceptionAsync(httpContext, ex);
                }
            }
        }
        private async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {

            try
            {
                if (ex.Message == "الرجاء تسجيل الدخول")
                {
                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                }
                else if (ex.Message == "لا تملك صلاحية")
                {
                    context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                }
                else
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                }
                context.Response.ContentType = "application/json";
                var errorFeature = context.Features.Get<IStatusCodeReExecuteFeature>();
                var exceptionFeature = context.Features.Get<IExceptionHandlerFeature>();
                if (exceptionFeature != null)
                {
                    _logger.LogError($"Something went wrong: {exceptionFeature.Error}");
                    var response = _hostingEnvironment.IsDevelopment() ?
                                      new ApiError(_logger, exceptionFeature.Error.Message, context.Response.StatusCode, null, exceptionFeature.Error.StackTrace, exceptionFeature.Error.GetType().Name)
                                      : new ApiError(_logger, " خطاء بالسرفر الرجاء اغلاق المتصفح والمحاولة من جديد", context.Response.StatusCode);

                    var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                    var json = System.Text.Json.JsonSerializer.Serialize(response, options);
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync(json);

                }
                else
                {
                    int statuscode = context.Response.StatusCode;

                    if (statuscode == StatusCodes.Status401Unauthorized)
                    {
                        _logger.LogInformation("Status401Unauthorized", statuscode);
                        var response = new ApiError(_logger, "الرجاء تسجيل الدخول", Convert.ToInt32(HttpStatusCode.Unauthorized));
                        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                        var json = System.Text.Json.JsonSerializer.Serialize(response, options);
                        await context.Response.WriteAsync(json);
                    }
                    else if (statuscode == StatusCodes.Status403Forbidden)
                    {
                        _logger.LogInformation("Status403Forbidden", statuscode);
                        var response = new ApiError(_logger, "لا تملك صلاحية", Convert.ToInt32(HttpStatusCode.Forbidden));
                        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                        var json = System.Text.Json.JsonSerializer.Serialize(response, options);
                        await context.Response.WriteAsync(json);
                    }
                    else if (statuscode == StatusCodes.Status405MethodNotAllowed)
                    {
                        _logger.LogInformation("Status 405 Method Not Allowed", statuscode);
                        var response = new ApiError(_logger, "Method Not Allowed", Convert.ToInt32(HttpStatusCode.MethodNotAllowed));
                        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                        var json = System.Text.Json.JsonSerializer.Serialize(response, options);
                        await context.Response.WriteAsync(json);
                    }
                    else if (statuscode == StatusCodes.Status404NotFound)
                    {
                        _logger.LogInformation("Status404NotFound", statuscode);
                        var response = new ApiError(_logger, "الرجاء التأكد من الرابط ", Convert.ToInt32(HttpStatusCode.NotFound));
                        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                        var json = System.Text.Json.JsonSerializer.Serialize(response, options);
                        await context.Response.WriteAsync(json);
                    }
                    else
                    {

                        var response = _hostingEnvironment.IsDevelopment() ? new ApiError(_logger, ex.Message, Convert.ToInt32(HttpStatusCode.InternalServerError), ex.GetBaseException().ToString(), ex.StackTrace, ex.GetType().ToString())
                        : new ApiError(_logger, ex.Message, Convert.ToInt32(HttpStatusCode.InternalServerError), null)
                        ;

                        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                        var json = System.Text.Json.JsonSerializer.Serialize(response, options);
                        _logger.LogInformation("unonEx", ex);
                        await context.Response.WriteAsync(json);
                    }
                }
                ApiMailRequest m = new ApiMailRequest();
                m.subject = ex.Message;
                m.plainTextContent = ex.StackTrace!;
                m.htmlContent = ex.GetBaseException().ToString();

                await _apimailService.SendEmailAsync(m);
            }
            catch (Exception mexp)
            {
                _logger.LogError($"Send Mail Exception occur: {mexp}");
                throw;
            }
        }
    }


}