

namespace infra.Extensions
{
    public static class UserManagerExensions
    {
        [Authorize]

        public static async Task<ApplicationUser> logedinuser(this UserManager<ApplicationUser> usrman, ClaimsPrincipal user)
        {
            var userId = user.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            if (userId == null || userId.Length == 0)
            {
                throw new ApiException("الرجاء تسجيل الدخول", 401);

            }
            return await usrman.Users.Include(m => m.Directorate)
                .Include(m => m.UsersSchools).
                ThenInclude(v => v.School)
                .Include(m => m.Roles)
              .SingleOrDefaultAsync(u => u.Id == userId); ;
        }

    }
}
