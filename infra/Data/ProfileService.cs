



namespace infra.Data
{
    public class ProfileService : IProfileService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserClaimsPrincipalFactory<ApplicationUser> _claimsFactory;
        private readonly ApplicationDbContextmariadb _context;
        public ProfileService(UserManager<ApplicationUser> userManager, IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory
        , ApplicationDbContextmariadb context
        )
        {
            _userManager = userManager;
            _claimsFactory = claimsFactory;
            _context = context;

        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {


            var user = await _userManager.GetUserAsync(context.Subject);
            if (user == null)
            {
                throw new ArgumentException("");
            }

            var principal = await _claimsFactory.CreateAsync(user);
            var claims = principal.Claims.ToList();



            var roleclime = claims.Where(c => c.Type == "role").ToList();
            if (roleclime.Count() > 0)
            {
                foreach (var r in roleclime)
                {
                    claims.Remove(r);
                }
            }
            var claims2 = new List<Claim>();

            claims2 = claims.Where(claim => context.RequestedClaimTypes.Contains(claim.Type)).ToList();

            if (user.FullName != null)
                claims2.Add(new Claim(JwtClaimTypes.Name, user.FullName));

            claims2.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims2.Add(new Claim(JwtClaimTypes.Role, role));

            }

            var Usersclassroom = _context.Usersclassrooms.Where(u => u.ApplicationUserId == user.Id).Select(i => i.classroomsId).ToList();
            if (Usersclassroom.Count > 0)
            {
                foreach (var d in Usersclassroom)
                {
                    claims2.Add(new Claim("Usersclassroom", d.ToString(), ClaimValueTypes.Integer32));

                }
            }

            var usersedumaterial = _context.usersedumaterials.Where(u => u.ApplicationUserId == user.Id).Select(i => i.edumaterialsId).ToList();
            if (usersedumaterial.Count > 0)
            {
                foreach (var d in usersedumaterial)
                {
                    claims2.Add(new Claim("usersedumaterial", d.ToString(), ClaimValueTypes.Integer32));

                }
            }
            var UsersSchool = _context.usersschools.Where(u => u.ApplicationUserId == user.Id).Select(i => i.SchoolId).ToList();
            if (UsersSchool.Count() > 0)
            {
                foreach (var d in UsersSchool)
                {
                    claims2.Add(new Claim("usrschool", d.ToString(), ClaimValueTypes.Integer32));

                }

            }



            context.IssuedClaims.AddRange(claims2);


        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await _userManager.FindByIdAsync(sub);

            context.IsActive = (user != null)
                  && user.IsEnabled;
        }
    }
}