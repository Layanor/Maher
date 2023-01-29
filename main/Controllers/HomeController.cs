namespace main.Controllers
{
    [Authorize()]
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : BaseController<HomeController>
    {
        public UserWithRoles CurentUser()
        {
            var userwithrole = _unitOfWork.GetLogedinuser();
            if (userwithrole == null)
            {
                throw new ApiException("الرجاء تسجيل الدخول", 401);
            }
            return userwithrole;
        }
    }
}
