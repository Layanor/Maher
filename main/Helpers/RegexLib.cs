namespace main.Helpers
{
    public class RegexLib
    {
        public static bool IsValidMohEmail(string mohemail)
        {
            string pattern = @"^[a-zA-Z0-9._%+-]+(@moh\.gov\.sa|@qps\.life)$";
            Regex newRegex = new Regex(pattern);
            return newRegex.IsMatch(mohemail);
        }
    }
}
