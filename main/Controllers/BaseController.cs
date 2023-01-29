
namespace main.Controllers.infra
{
    [Authorize]
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]

    public class BaseController<T> : ControllerBase, IDisposable where T : BaseController<T>
    {
        private IWebHostEnvironment hostingEnvironment;

        private ILogger<T> logger;
        private  IMapper mapper;
        protected IWebHostEnvironment _hostingEnvironment => hostingEnvironment ?? (hostingEnvironment = HttpContext.RequestServices.GetService<IWebHostEnvironment>());
        private IUnitOfWork unitOfWork;
        protected IUnitOfWork _unitOfWork => unitOfWork ?? (unitOfWork = HttpContext.RequestServices.GetService<IUnitOfWork>());
        protected ILogger<T> _Logger => logger ?? (logger = HttpContext.RequestServices.GetService<ILogger<T>>());
        protected IMapper _mapper => mapper ?? (mapper = HttpContext.RequestServices.GetService<IMapper>());

        bool disposed = false;

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        // Protected implementation of Dispose pattern.
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                if (_unitOfWork != null)
                {
                    _unitOfWork.Dispose();
                }
            }

            disposed = true;
        }
        ~BaseController()
        {
            Dispose(false);
        }


    }
}

