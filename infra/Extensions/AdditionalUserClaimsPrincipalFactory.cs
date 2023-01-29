

namespace infra.Extensions
{
    public class AdditionalUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<ApplicationUser, ApplicationRole>
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly ApplicationDbContextmariadb _context;
        public AdditionalUserClaimsPrincipalFactory(
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager,
            IOptions<IdentityOptions> optionsAccessor
            , ApplicationDbContextmariadb context,
            IHttpContextAccessor contextAccessor
            )
            : base(userManager, roleManager, optionsAccessor)
        {
            _context = context;
            _contextAccessor = contextAccessor;
        }

        public override async Task<ClaimsPrincipal> CreateAsync(ApplicationUser user)
        {
           

            ClaimsPrincipal principal = await base.CreateAsync(user);
            var identity = (ClaimsIdentity)principal.Identity;
            if (!string.IsNullOrWhiteSpace(user.FullName))
            {
                identity.AddClaim(new Claim("fullname", user.FullName));
            }
            if (!string.IsNullOrWhiteSpace(user.Email))
            {
                identity.AddClaim(new Claim(ClaimValueTypes.Email, user.Email));
            }
            if (user.DirectorateId != 0)
            {
                identity.AddClaim(new Claim("usersdirs", user.DirectorateId.ToString(), ClaimValueTypes.Integer32));
            }
             var Usersclassroom = _context.Usersclassrooms.Where(u => u.ApplicationUserId == user.Id).Select(i => i.classroomsId).ToList();
            if (Usersclassroom.Count > 0)
            {
                foreach (var d in Usersclassroom)
                {
                    identity.AddClaim(new Claim("Usersclassroom", d.ToString(), ClaimValueTypes.Integer32));

                }
            }

            var usersedumaterial = _context.usersedumaterials.Where(u => u.ApplicationUserId == user.Id).Select(i => i.edumaterialsId).ToList();
            if (usersedumaterial.Count > 0)
            {
                foreach (var d in usersedumaterial)
                {
                    identity.AddClaim(new Claim("usersedumaterial", d.ToString(), ClaimValueTypes.Integer32));

                }
            }
         
            var usrschool = _context.usersschools.Where(u => u.ApplicationUserId == user.Id).Select(i => i.SchoolId).ToList();
            if (usrschool.Count > 0)
            {
                foreach (var d in usrschool)
                {
                    identity.AddClaim(new Claim("usrschool", d.ToString(), ClaimValueTypes.Integer32));

                }
            }
            return principal;
        }
    }
}