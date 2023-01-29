



namespace infra.Data
{
    public interface ISeedData
    {
        void InitialiseAsync();
    }
    public class SeedDbData : ISeedData
    {
    

        readonly ApplicationDbContextmariadb _context;

        private readonly Serilog.ILogger _logger;
 
        public SeedDbData(ApplicationDbContextmariadb context, Serilog.ILogger logger
     
            )
        {


            _context = context;
            _logger = logger;
      

        }

        public void InitialiseAsync()
        {

          
            try
            {
                _logger.Warning("Start add migration to  database");
                _context.Database.Migrate();
          
                _logger.Warning(" migration Added");
             
            }
            finally
            {
                _context.Database.CloseConnection();
            }
        }

    


    }
}
