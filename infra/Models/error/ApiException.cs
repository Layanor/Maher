

namespace infra.Models.error
{
    public class ApiException : Exception
    {
        public int Statuscode { get; set; }
        public string Detail { get; set; } = default!;
        public List<ValidationError> Errors { get; set; } = default!;
        public ApiException(string message = "الرجاء اعادة المحاولة لاحقا - خطاء بالسرفر  - 500",
        int statusCode = 500, string details = null, 
        List<ValidationError> error = null) : base(message)
        {
            Detail = details;
            Statuscode = statusCode;
            Errors = error;
            message = message ?? GetDefultMessageForStatusCode(statusCode);
        }
        public ApiException(Exception ex, int statusCode = 500) : base(ex.Message)
        {
            Statuscode = statusCode;
        }
        private string GetDefultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "الرجاء التأكد من البيانات المرسلة - 400",
                401 => "الرجاء تسجيل الدخول - لاتملك صلاحية - 401",
                404 => "لم يتم العثور على الصفحة - 404",
                500 => "الرجاء اعادة المحاولة لاحقا - خطاء بالسرفر  - 500",
                _ =>  "خطاء غير",
            };
        }
    }
    public class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message)
        { }
        public NotFoundException(string name, object key)
           : base($"Entity \"{name}\" ({key}) was not found.")
        {
        }
    }
    public class BadRequestException : Exception
    {
        public BadRequestException(string message)
            : base(message)
        {
        }
    }
}
