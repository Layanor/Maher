
namespace infra.Models.error
{
    public class ValidationError
    {
       // [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Field { get; }

        public string Message { get; }

        public ValidationError(string field, string message)
        {
            Field = field;
            Message = message;
        }
    }
}
