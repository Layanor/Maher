
namespace infra.Data
{
    public class ApplicationDbContextmariadb : ApiAuthorizationDbContext<ApplicationUser>
    {
        public string CurrentUserId { get; set; } = default!;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DbSet<ApplicationUser> ApplicationUsers { get; set; } = default!;

        public DbSet<ApplicationRole> ApplicationRoles { get; set; } = default!;

        public DbSet<Directorate> directorates { get; set; } = default!;
        public DbSet<evaluation> evaluations { get; set; } = default!;
        public DbSet<edumaterial> edumaterials { get; set; } = default!;
        public DbSet<classroom> classrooms { get; set; } = default!;
        public DbSet<School> schools { get; set; } = default!;
        //
        public DbSet<ApiError> apierror { get; set; } = default!;

        public DbSet<UserType> UserTypes { get; set; } = default!;

        public DbSet<usersedumaterial> usersedumaterials { get; set; } = default!;
        public DbSet<Usersclassroom> Usersclassrooms { get; set; } = default!;
        public DbSet<UsersSchool> usersschools { get; set; } = default!;



        public DbSet<SchoolType> schooltypes { get; set; } = default!;



        public ApplicationDbContextmariadb(
            DbContextOptions<ApplicationDbContextmariadb> options, IHttpContextAccessor httpContextAccessor,
            IOptions<OperationalStoreOptions> operationalStoreOptions) :
             base(options, operationalStoreOptions)
        {
            _httpContextAccessor = httpContextAccessor;

        }



        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);
            builder.Entity<ApplicationUser>(b =>
            {
                b.Property(u => u.UserName).HasMaxLength(128);
                b.Property(u => u.NormalizedUserName).HasMaxLength(128);
                b.Property(u => u.Email).HasMaxLength(128);
                b.Property(u => u.NormalizedEmail).HasMaxLength(128);
            });
            builder.Entity<ApplicationUser>().HasMany(b => b.Roles).WithOne().HasForeignKey(p => p.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Directorate>()
            .HasMany(c => c.Schools)
            .WithOne(e => e.Directorate).IsRequired().OnDelete(DeleteBehavior.Restrict);

            builder.Entity<SchoolType>()
             .HasMany(c => c.Schools)
             .WithOne(e => e.SchoolTypes).IsRequired().OnDelete(DeleteBehavior.Restrict);


            builder.Entity<Usersclassroom>()
             .HasKey(bc => new { bc.ApplicationUserId, bc.classroomsId });

            builder.Entity<Usersclassroom>()
                .HasOne(bc => bc.ApplicationUser)
                .WithMany(b => b.Usersclassrooms)
                .HasForeignKey(bc => bc.ApplicationUserId);

            builder.Entity<Usersclassroom>()
                .HasOne(bc => bc.classrooms)
                .WithMany(c => c.Usersclassrooms)
                .HasForeignKey(bc => bc.classroomsId);

            builder.Entity<usersedumaterial>()
            .HasKey(bc => new { bc.ApplicationUserId, bc.edumaterialsId });

            builder.Entity<usersedumaterial>()
                .HasOne(bc => bc.ApplicationUser)
                .WithMany(b => b.usersedumaterials)
                .HasForeignKey(bc => bc.ApplicationUserId);

            builder.Entity<usersedumaterial>()
                .HasOne(bc => bc.edumaterials)
                .WithMany(c => c.usersedumaterials)
                .HasForeignKey(bc => bc.edumaterialsId);

            builder.Entity<UsersSchool>()
             .HasKey(bc => new { bc.ApplicationUserId, bc.SchoolId });

            builder.Entity<UsersSchool>()
                .HasOne(bc => bc.ApplicationUser)
                .WithMany(b => b.UsersSchools)
                .HasForeignKey(bc => bc.ApplicationUserId);

            builder.Entity<UsersSchool>()
                .HasOne(bc => bc.School)
                .WithMany(c => c.UsersSchools)
                .HasForeignKey(bc => bc.SchoolId);


            builder.Entity<Directorate>().HasData(
       new Directorate { Id = 1, Name = "  منطقة الرياض" });

            builder.Entity<SchoolType>().HasData(
   new SchoolType { Id = 1, Name = "  حكومي" }, new SchoolType { Id = 2, Name = "  اهلي" });

            builder.Entity<UserType>().HasData(
          new UserType { Id = 1, Name = "الادارة" },
          new UserType { Id = 2, Name = "معلم" },
           new UserType { Id = 3, Name = "طالب" });

            builder.Entity<School>().HasData(
       new School { Id = 1, Name = " مدرسة تجربة المثالية", DirectorateId = 1, Email = "arabmed@gmail.com", SchoolTypesId = 1 });

            //

            List<ApplicationRole> allroles = new(){
                        new ApplicationRole { Name = "SuperMuder",  Description = "المدير العام للموقع", NormalizedName = "SUPERMUDER"},
                        new ApplicationRole {  Name = "Muder",  Description = "أدارة الموقع",  NormalizedName = "MUDER"  },
                        new ApplicationRole { Name = "Tech", Description = " مدرس ", NormalizedName = "TECH".ToUpper() },
                        new ApplicationRole { Name = "STudent", Description = "طالب", NormalizedName = "STUDENT".ToUpper() },
       };
            foreach (var r in allroles)
            {
                builder.Entity<ApplicationRole>().HasData(r);
            }

            var hasher = new PasswordHasher<ApplicationUser>();
            var pas = hasher.HashPassword(null, "zxcvbnm1A@");
            var pas2 = hasher.HashPassword(null, "Aa@123123");
            List<ApplicationUser> allusers = new(){
                      new ApplicationUser
            {
                UserName = "arabmed@gmail.com",
                FullName = "Admin first",
                Email = "arabmed@gmail.com",
                EmailConfirmed = true,
                IsEnabled = true,
                DirectorateId = 1,
                NormalizedEmail = "arabmed@gmail.com".ToUpper(),
                NormalizedUserName = "arabmed@gmail.com".ToUpper(),
                PhoneNumber = "0508698954",
                UserPhone= "0508698954",
                IdNumber = 2202861957,
                EnterDateTime = new DateTime(1973,01,21),
                UserTypeId = 1  ,
                PasswordHash = pas
            },
              new ApplicationUser
            {
                UserName = "r@rme.me",
                FullName = "مدير الموقع ",
                Email = "r@rme.me",
                EmailConfirmed = true,
                IsEnabled = true,
                DirectorateId = 1,
                NormalizedEmail = "r@rme.me".ToUpper(),
                NormalizedUserName = "r@rme.me".ToUpper(),
                PhoneNumber = "0508698954",
                UserPhone= "0508698954",
                IdNumber = 1111111111,
                EnterDateTime = new DateTime(1973,01,21),
                UserTypeId = 1  ,
                PasswordHash = pas2
            }
            };

            foreach (var u in allusers)
            {
                builder.Entity<ApplicationUser>().HasData(u);
            }

            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                UserId = allusers[0].Id,
                RoleId = allroles.FirstOrDefault(r => r.Name == "SuperMuder").Id
            });
             builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                UserId = allusers[0].Id,
                RoleId = allroles.FirstOrDefault(r => r.Name == "Muder").Id
            });

            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            { UserId = allusers[1].Id, RoleId = allroles.FirstOrDefault(r => r.Name == "Muder").Id });


        }

        [Authorize]
        public UserWithRoles GetLogedinuser()
        {
            var userall = (_httpContextAccessor?.HttpContext?.User);
            var userId = userall.FindFirstValue(ClaimTypes.NameIdentifier); // will give the user's userId
            if (userId == null)
            {
                throw new ApiException("الرجاء تسجيل الدخول", 401);
            }
            var allrole = userall.FindAll("role").Select(x => x.Value).ToList();
            if (allrole.Count() == 0)
            {
                throw new ApiException("لا تملك صلاحية", 403);
            }
            var usrschool = userall.FindAll("usrschool").Select(x => int.Parse(x.Value)).ToList();
            var usrtyp = userall.FindAll("usetype").Select(x => int.Parse(x.Value)).ToList();
            var name = userall.FindFirstValue("fullname");
            var userdir = userall.FindFirstValue("usersdirs");
            var email = userall.FindFirstValue(ClaimValueTypes.Email);
            var userandrole = new UserWithRoles()
            {
                Id = userId != null ? userId : "",
                DirectorateId = int.Parse(userdir) != 0 ? int.Parse(userdir) : 0,
                FullName = name != null ? name : "",
                Email = email != null ? email : "",
                Roles = allrole != null ? allrole : new List<string> { },
                userstypes = usrtyp != null ? usrtyp : new List<int> { },
                UsersSchool = usrschool != null ? usrschool : new List<int> { },
            };
            return userandrole;
        }
    }
}
