

using MySqlConnector;

namespace infra.Repo
{
    public class UnitOfWork : IUnitOfWork
    {
        private IWebHostEnvironment _hostingEnvironment;
        IConfiguration _Configuration;
        private readonly ApplicationDbContextmariadb _context;
        private Hashtable _repositories;
        private bool disposedValue;

        public UnitOfWork(ApplicationDbContextmariadb context, IWebHostEnvironment environment, IConfiguration Configuration)
        {
            _hostingEnvironment = environment;
            _context = context;
            _Configuration = Configuration;
        }

        public IEnumerable<T> LoadDataListWithParameters<T>(string sql, DynamicParameters parameters = null)
        {
            var connectionStringmariadb = _Configuration.GetConnectionString("DefaultConnectionmariadb");
            var serverVersion = new MySqlServerVersion(new Version(10, 6, 11));
            IDbConnection dbConnection = new MySqlConnection(connectionStringmariadb);
            var data = dbConnection.Query<T>(sql, parameters);
            return data;
        }

        public T LoadDataSingleWithParameters<T>(string sql, DynamicParameters parameters = null)
        {
            var connectionStringmariadb = _Configuration.GetConnectionString("DefaultConnectionmariadb");
            var serverVersion = new MySqlServerVersion(new Version(10, 6, 11));
            IDbConnection dbConnection = new MySqlConnection(connectionStringmariadb);
            return dbConnection.QuerySingle<T>(sql, parameters);
        }
        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
        public async Task<int> Complete()
        {
            try
            {
                return await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new ApiException(ex);
            }
        }
        public UserWithRoles GetLogedinuser()
        {
            // var userId = _context.getuserid();
            var userwithrole = _context.GetLogedinuser();


            if (userwithrole == null)
            {
                throw new ApiException("الرجاء تسجيل الدخول", 401);

            }

            return userwithrole;
        }


        public IDataRepo<T> Repository<T>() where T : BaseModel
        {
            if (_repositories == null) _repositories = new Hashtable();

            var type = typeof(T).Name;

            if (!_repositories.ContainsKey(type))
            {
                var repositoryType = typeof(DataRepo<>);
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(T)), _context);

                _repositories.Add(type, repositoryInstance);
            }

            return (IDataRepo<T>)_repositories[type];
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects)
                }

                // TODO: free unmanaged resources (unmanaged objects) and override finalizer
                // TODO: set large fields to null
                disposedValue = true;
            }
        }
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}
