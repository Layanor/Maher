

namespace main.Controllers.infra
{
    [Authorize(Roles = "Muder"
  // "Identity.Application"
  )]

    public class HospUserAdminController : BaseController<HospUserAdminController>
    {

        // private readonly IDataRepo _idatarepo;
        private readonly ApplicationDbContextmariadb _db;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        public HospUserAdminController(

             UserManager<ApplicationUser> userManager,
              RoleManager<ApplicationRole> roleManager,
              ApplicationDbContextmariadb db

          )
        {

            _userManager = userManager;
            _roleManager = roleManager;
            _db = db;
        }

        private Task<ApplicationUser> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);

        public UserWithRoles CurentUser()
        {
            var userwithrole = _unitOfWork.GetLogedinuser();
            if (userwithrole == null)
            {
                throw new ApiException("الرجاء تسجيل الدخول", 401);

            }
            var currentRoles = userwithrole.Roles != null ? userwithrole.Roles.ToList() : new List<string>();
            if (!currentRoles.Contains("Muder"))
                throw new ApiException("لا تملك صلاحية", 403);
            return userwithrole;
        }
         [HttpPost("classList")]
        public async Task<IActionResult> MedList()
        {

            var user = CurentUser();
            if (user.Id == null)
            {
                return BadRequest(new ApiError(_Logger, "الرجاء تسجيل الدخول"));
            }
          
            var data = await _unitOfWork.Repository<classroom>().GetAllListAsync( );
            var list = data.Select(m => new { value = m.Id, text = m.Name });

            return Ok(list);
        }
        [HttpPost("eduList")]
        public async Task<IActionResult> clinicList()
        {

            var user = CurentUser();
            if (user.Id == null)
            {
                return BadRequest(new ApiError(_Logger, "الرجاء تسجيل الدخول"));
            }
          
            var data = await _unitOfWork.Repository<edumaterial>().GetAllListAsync();
            var list = data.Select(m => new { value = m.Id, text = m.Name });
            return Ok(list);
        }
        [Produces("application/json")]
        [HttpPost("email/{email}")]
        public async Task<IActionResult> EmailAlreadyExistsAsync(string email)
        {
            var user = CurentUser();
            if (user.Id == null)
            {
                return BadRequest(new ApiError(_Logger, "الرجاء تسجيل الدخول"));
            }
            if (!String.IsNullOrEmpty(email))
            {
                    var result = await _userManager.FindByEmailAsync(email);
                    if (result == null)
                    {
                        return Ok();
                    }
                    return Ok("used");
            
            }
            return BadRequest(new ApiError(_Logger, "الرجاء استخدام  بريد الكتروني صالح"));

        }

        [HttpPost("UserTypeList")]
        public async Task<IActionResult> UserTypeList()
        {

            var user = CurentUser();
            if (user.Id == null)
            {
                return BadRequest(new ApiError(_Logger, "الرجاء تسجيل الدخول"));
            }
            //  var dirid = user.Result.DirectorateId;
            var data = await _unitOfWork.Repository<UserType>().GetAllListAsync();

            var list = data.Select(m => new { value = m.Id, text = m.Name });

            return Ok(list);
        }


        [HttpPost("listuser/{id}")]
        public async Task<ActionResult> Index(int id)
        {


            var user = CurentUser();
            if (user.Id == null)
            {
                return BadRequest(new ApiError(_Logger, "الرجاء تسجيل الدخول"));
            }
            // var dirid = user.Result.UsersDirs.Select(w => w.DirectorateId).FirstOrDefault();
            var dirid = user.DirectorateId;
            var allroles = _roleManager.Roles.ToList();
            //  await _db.Roles.ToListAsync();
            var supermuder = allroles.SingleOrDefault(m => m.Name == "SuperMuder");
            var muder = allroles.SingleOrDefault(m => m.Name == "Muder");

            List<ApplicationUser> allusers = await _db.Users
            .Include(r => r.Roles)
            .Include(u => u.Usersclassrooms).ThenInclude(u => u.classrooms)
             .Include(u => u.usersedumaterials).ThenInclude(u => u.edumaterials)
               .Where(d => d.DirectorateId == dirid && d.UserTypeId == id)
               .Where(u => u.Roles.All(r => r.RoleId != supermuder.Id))
               .ToListAsync();
            ///
            List<UserwiteRolesViewModel> alluserwitheroles = new List<UserwiteRolesViewModel>();

            List<string> roleslist = new List<string>(new string[] { "لا يمتلك اي صلاحيات" });

            foreach (var u in allusers)
            {
                var UserwiteRolesViewModel = new UserwiteRolesViewModel()
                {
                    Id = u.Id,
                    FullName = u.FullName,
                    Email = u.Email,
                    userphone = u.UserPhone,
                    IdNumber = u.IdNumber,
                    age = (int)((DateTime.Now - u.EnterDateTime).TotalDays / 365.242199)
                };
                List<string> usersedumaterials = new() { };
                if (u.usersedumaterials.Count > 0)
                {
                    var name = u.usersedumaterials.Select(n => n.edumaterials.Name).ToList();
                    usersedumaterials.AddRange(name);
                }
                List<string> Usersclassrooms = new() { };
                if (u.Usersclassrooms.Count > 0)
                {
                    var name = u.Usersclassrooms.Select(n => n.classrooms.Name).ToList();
                    Usersclassrooms.AddRange(name);
                }
                if (u.UserTypeId == 1)
                {
                    UserwiteRolesViewModel.Usersclassrooms = new() { "الادارة" };
                    UserwiteRolesViewModel.Usersedumatrials = new() { "الادارة" };
                }
                else if (u.UserTypeId == 2)
                {
                    UserwiteRolesViewModel.Usersclassrooms = Usersclassrooms;
                    UserwiteRolesViewModel.Usersedumatrials = usersedumaterials;

                }
                else if (u.UserTypeId == 3)
                {
                    UserwiteRolesViewModel.Usersclassrooms = Usersclassrooms;
                    UserwiteRolesViewModel.Usersedumatrials = new() { "" };
                }

                alluserwitheroles.Add(UserwiteRolesViewModel);
            }
            return new OkObjectResult(new { result = alluserwitheroles, count = alluserwitheroles.Count() });

        }


        [HttpPost("Insert/{id}")]
        // [ValidateAntiForgeryToken]
        //[CaptchaValidation("CaptchaCode", "RegisterCaptcha1", "رمز التحقق غير صحيح  . الرجاء كتابة الرمز الظاهر بالصورة")]
        public async Task<ActionResult<NewUserViewModel>> Insert([FromBody] NewUserViewModel value, int id)
        {
            if (id == 0 || id != 1 || id != 2 || id != 3)
            {
                return BadRequest(new ApiError(_Logger, "الرجاء التأكد من نوع المستخدم"));
            }
            var user = CurentUser();
            if (user.Id == null)
            {
                return BadRequest(new ApiError(_Logger, "الرجاء تسجيل الدخول"));
            }

            var dirid = user.DirectorateId;

            var email = await _userManager.FindByEmailAsync(value.Email);
            if (email != null)
            {
                ModelState.AddModelError("Email", @"البريد الالكتروني مستخدم في أنشاء حساب آخر. الرجاء استعادة كلمة السر");
                return BadRequest(new ApiError(_Logger, $"{nameof(NewUserViewModel)}البريد الالكتروني مستخدم في أنشاء حساب آخر. الرجاء استعادة كلمة السر"));
            }
            if (ModelState.IsValid)
            {
                List<string> selectedRoles = new List<string>();
                List<edumaterial> edumaterials = new List<edumaterial>();
                List<classroom> classrooms = new List<classroom>();
                var newuser = new ApplicationUser
                {
                    IsEnabled = true,
                    EmailConfirmed = true,
                    UserName = value.Email,
                    Email = value.Email,
                    FullName = value.FullName,
                    DirectorateId = dirid,
                    UserPhone = value.UserPhone,
                    EnterDateTime = value.EnterDateTime,
                    IdNumber = value.IdNumber,
                    UserTypeId = id,
                };

                var result = await _userManager.CreateAsync(newuser, value.Password);
                if (result.Succeeded)
                {
                    List<Usersclassroom> clasroms = new() { };
                    List<usersedumaterial> edumat = new() { };
                    List<UsersSchool> usersSchools = new List<UsersSchool>() { };
                    usersSchools.Add(new UsersSchool
                    {
                        ApplicationUserId = newuser.Id,
                        SchoolId = 1
                    });
                    if (value.Usersclassrooms != null && value.Usersclassrooms.Count > 0)
                    {
                        var alldata = await _unitOfWork.Repository<classroom>().GetAllListAsync();
                        foreach (var item in value.Usersclassrooms)
                        {
                            var med = alldata.Where(x => x.Id == item).FirstOrDefault();
                            if (med == null)
                            {
                                await Removeuser(newuser.Id);
                                return BadRequest(new ApiError(_Logger, "لم يتم العثور على الفصل الدراسي"));
                            }
                            else
                            {
                                Usersclassroom main = new Usersclassroom();
                                main.ApplicationUserId = newuser.Id;
                                main.classroomsId = med.Id;
                                clasroms.Add(main);
                            }

                        }
                    }
                    if (value.Usersedumatrials != null && value.Usersedumatrials.Count > 0)
                    {
                        var alldata = await _unitOfWork.Repository<edumaterial>().GetAllListAsync();

                        foreach (var item in value.Usersedumatrials)
                        {
                            var cli = alldata.Where(x => x.Id == item).FirstOrDefault();
                            if (cli == null)
                            {
                                await Removeuser(newuser.Id);
                                return BadRequest(new ApiError(_Logger, "لم يتم العثور على  المادة التعليمية "));
                            }
                            else
                            {
                                usersedumaterial main = new usersedumaterial();
                                main.ApplicationUserId = newuser.Id;
                                main.edumaterialsId = cli.Id;
                                edumat.Add(main);
                            }

                        }
                    }

                    if (value.UserType != 0)
                    {
                            if (value.UserType == 1)
                            {
                                selectedRoles.Add("Muder");
                            }
                            if (value.UserType == 2)
                            {
                                selectedRoles.Add("Tech");
                            }
                            if (value.UserType == 3)
                            {
                                selectedRoles.Add("STudent");
                            }
                           
                    }
              
                    if (clasroms.Count > 0)
                    {
                        _db.Usersclassrooms.AddRange(clasroms);
                    }
                    if (edumat.Count > 0)
                    {
                        _db.usersedumaterials.AddRange(edumat);
                    }
                    if (usersSchools.Count > 0)
                    {
                        _db.usersschools.AddRange(usersSchools);
                    }
                    await _db.SaveChangesAsync();
                    var roleresult = await _userManager.AddToRolesAsync(newuser, selectedRoles);
                    if (!roleresult.Succeeded)
                    {
                        await Removeuser(newuser.Id);
                        foreach (var error in roleresult.Errors)
                        {
                            ModelState.AddModelError(string.Empty, error.Description);
                        }
                        return BadRequest(new ApiError(_Logger, ModelState));
                    }
                    _Logger.LogInformation("User created a new account with password.");
                    return Ok();
                }
                await Removeuser(newuser.Id);
                return BadRequest(new ApiError(_Logger, ModelState));
            }

            return BadRequest(new ApiError(_Logger, ModelState));
        }
        public async Task<ActionResult> Removeuser(string Id)
        {
            var user = CurentUser();
            if (user.Id == null)
            {
                return BadRequest(new ApiError(_Logger, "الرجاء تسجيل الدخول"));
            }
            ApplicationUser appuser = await _userManager.FindByIdAsync(Id);
            if (appuser != null)
            {
                await _userManager.DeleteAsync(appuser);
            }

            return Ok();
        }




        // [Produces("application/json")]
        // [HttpPost("user/{id}")]
        // public async Task<ActionResult> Details(string id)
        // {
        //     if (id == null)
        //     {
        //         return BadRequest(new ApiError(_Logger, "المستخدم غير موجود"));
        //     }
        //     var louser = CurentUser();
        //     if (louser.Id == null)
        //     {
        //         return BadRequest(new ApiError(_Logger, "الرجاء تسجيل الدخول"));
        //     }
        //     var dirid = louser.DirectorateId;
        //     //  var dirid = louser.Result.UsersDirs.Select(w => w.DirectorateId).FirstOrDefault();

        //     var user = await _db.Users
        //         //.Include(m => m.UsersAsses).ThenInclude(v => v.Assistants).ThenInclude(v => v.mainassis).ThenInclude(v => v.MainIndicators)
        //         .Include(m => m.UsersDirs).ThenInclude(v => v.Directorate)
        //         //.Include(m => m.UsersSups).ThenInclude(v => v.Supervisor)
        //         .Include(m => m.UsersMeds).ThenInclude(v => v.MedicalCenter)
        //         .Include(m => m.usersClinics).ThenInclude(v => v.clinic)
        //         .Include(m => m.Roles)
        //          .Include(m => m.userstypes).ThenInclude(v => v.UserType)
        //           .Include(m => m.usersistemaras).ThenInclude(v => v.istemara)
        //           .Include(m => m.usersComptypes).ThenInclude(v => v.CompType)
        //         .SingleOrDefaultAsync(u => u.Id == id);

        //     if (user == null)
        //     {

        //         return BadRequest(new ApiError(_Logger, "المستخدم غير موجود"));
        //     }

        //     if (user.DirectorateId != dirid)
        //     {

        //         return BadRequest(new ApiError(_Logger, "لا تملك صلاحية"));
        //     }
        //     var allroles = await _db.Roles.ToListAsync();
        //     var supermuder = allroles.SingleOrDefault(m => m.Name == "SuperMuder");
        //     var muder = allroles.SingleOrDefault(m => m.Name == "Muder");

        //     if (user.Roles.Count > 0)
        //     {
        //         if (user.Roles.All(r => r.RoleId == supermuder.Id))
        //         {

        //             return BadRequest(new ApiError(_Logger, "لا تملك صلاحية"));
        //         }
        //         if (user.Roles.All(r => r.RoleId == muder.Id))
        //         {
        //             return BadRequest(new ApiError(_Logger, "لا تملك صلاحية"));
        //         }
        //     }



        //     //if (await _userManager.IsInRoleAsync(user, "Muder"))
        //     //{
        //     //                   return BadRequest(new ApiError( _Logger,"لا تملك صلاحية"));

        //     //}
        //     //if (await _userManager.IsInRoleAsync(user, "SuperMuder"))
        //     //{
        //     //                    return BadRequest(new ApiError( _Logger,"لا تملك صلاحية"));

        //     //}

        //     List<string> mylist = new List<string>(new string[] { "لا يمتلك اي صلاحيات" });

        //     //List<UserType> userType = new List<UserType>();
        //     //userType.Add(new UserType() { Id = 0, Name = "الرجاء أختيار نوع المستخدم" });
        //     //userType.Add(new UserType() { Id = 1, Name = "المديريات" });
        //     ////userType.Add(new UserType() { Id = 2, Name = "ملاك المعاير" });
        //     ////userType.Add(new UserType() { Id = 3, Name = "ادارة اشرافية" });
        //     //userType.Add(new UserType() { Id = 4, Name = "ادارة" });
        //     ////userType.Add(new UserType() { Id = 99, Name = " وزارة" });
        //     ///
        //     List<Helthfac> newhf = new List<Helthfac>();
        //     // newhf.Add(new helthfac() { value = 0, text = "" });

        //     var cl = user.usersClinics.Select(m => m.clinic).ToList();
        //     List<Helthfac> userclinics = new List<Helthfac>();
        //     if (cl.Count() > 0)
        //     {
        //         foreach (var item in cl)
        //         {
        //             Helthfac hf = new Helthfac()
        //             {
        //                 value = item.Id,
        //                 text = item.Name,
        //             };
        //             userclinics.Add(hf);
        //         }
        //     }

        //     // var cllist = cl.Select(m => new { value = m.Id, text = m.Name });

        //     var md = user.UsersMeds.Select(m => m.MedicalCenter).ToList();
        //     //    var mdlist = md.Select(m => new { value = m.Id, text = m.Name });
        //     List<Helthfac> usermeds = new List<Helthfac>();
        //     if (md.Count() > 0)
        //     {
        //         foreach (var item in md)
        //         {
        //             Helthfac hf = new Helthfac()
        //             {
        //                 value = item.Id,
        //                 text = item.Name,
        //             };
        //             usermeds.Add(hf);
        //         }
        //     }

        //     var usertype = user.userstypes.Select(m => m.UserType).ToList();
        //     //    var mdlist = md.Select(m => new { value = m.Id, text = m.Name });
        //     List<Helthfac> ut = new List<Helthfac>();
        //     if (usertype.Count > 0)
        //     {
        //         foreach (var item in usertype)
        //         {
        //             Helthfac hf = new Helthfac()
        //             {
        //                 value = item.Id,
        //                 text = item.Name,
        //             };
        //             ut.Add(hf);
        //         }
        //     }

        //     // var istmara = user.usersistemaras.Select(m => m.istemara).ToList();
        //     // //    var mdlist = md.Select(m => new { value = m.Id, text = m.Name });
        //     // List<helthfac> ist = new List<helthfac>();
        //     // if (istmara.Count() > 0)
        //     // {
        //     //     foreach (var item in istmara)
        //     //     {
        //     //         helthfac hf = new helthfac()
        //     //         {
        //     //             value = item.Id,
        //     //             text = item.text,
        //     //         };
        //     //         ist.Add(hf);
        //     //     }
        //     // }
        //     var userscomptype = user.usersComptypes.Select(m => m.CompType).ToList();
        //     //    var mdlist = md.Select(m => new { value = m.Id, text = m.Name });
        //     List<Helthfac> usercomptype = new List<Helthfac>();
        //     if (userscomptype.Count() > 0)
        //     {
        //         foreach (var item in userscomptype)
        //         {
        //             Helthfac hf = new Helthfac()
        //             {
        //                 value = item.value,
        //                 text = item.Name,
        //             };
        //             usercomptype.Add(hf);
        //             // if (item == 1)
        //             //{
        //             //    helthfac hf = new helthfac()
        //             //    {
        //             //        value = item,
        //             //        text = "بلاغات 937",
        //             //    };
        //             //    usercomptype.Add(hf);
        //             //}
        //             //if (item == 2)
        //             //{
        //             //    helthfac hf = new helthfac()
        //             //    {
        //             //        value = item,
        //             //        text = "بلاغات مركز القيادة والتحكم",
        //             //    };
        //             //    usercomptype.Add(hf);
        //             //}

        //         }
        //     }
        //     var UserwiteRolesViewModel = new UserwiteRolesViewModel()
        //     {
        //         Id = user.Id,
        //         FullName = user.FullName,
        //         Email = user.Email,
        //         md = usermeds.Count > 0 ? usermeds : newhf,
        //         // istmara = ist.Count > 0 ? ist : newhf,
        //         usertype = ut.Count > 0 ? ut : newhf,
        //         cilinic = userclinics.Count > 0 ? userclinics : newhf,
        //         usercomptype = usercomptype.Count > 0 ? usercomptype : newhf,
        //         isEnabled = user.IsEnabled,

        //         //UserType = userType.Where(w => w.Id == user.UserType).Select(n => n.Name).FirstOrDefault(),
        //         //Directorates = user.UsersDirs.Select(e => e.Directorate.Name).ToList(),
        //         //Assistants = user.UsersAsses.Select(e => e.Assistants.Name).ToList(),
        //         //Supervisors = user.UsersSups.Select(e => e.Supervisor.Name).ToList(),
        //         // MedicalCenters = user.UsersMeds.Select(e => e.MedicalCenter.Name).ToList(),

        //         //RolesDes = allroles.Where(r => user.Roles.Select(ur => ur.RoleId).Contains(r.Id)).Select(d => d.Description).ToList().Count() > 0
        //         //               ? allroles.Where(r => user.Roles.Select(ur => ur.RoleId).Contains(r.Id)).Select(d => d.Description).ToList()
        //         //               : mylist,
        //         //MainInds = user.UsersAsses.SelectMany(e => e.Assistants.mainassis.Select(m => m.MainIndicators.ShortName)).ToList(),
        //         //new List<string>(new string[] { "لا يشرف على اي معاير" }),

        //     };

        //     return Ok(UserwiteRolesViewModel);



        // }


        // [HttpPut("putuser/{id}")]

        // public async Task<IActionResult> UpdateUser(string id, [FromBody] PassEditUserViewModel model)
        // {
        //     if (id == null)
        //     {
        //         return BadRequest(new ApiError(_Logger, "المستخدم غير موجود"));
        //     }
        //     if (model == null)

        //         return BadRequest(new ApiError(_Logger, $"{nameof(model)} cannot be null"));
        //     if (!string.IsNullOrWhiteSpace(model.Id) && id != model.Id)
        //         return BadRequest(new ApiError(_Logger, "Conflicting user id in parameter and model data"));

        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest(new ApiError(_Logger, ModelState));

        //     }


        //     var louser = CurentUser();
        //     if (louser.Id == null)
        //     {
        //         return BadRequest(new ApiError(_Logger, "الرجاء تسجيل الدخول"));
        //     }

        //     // var dirid = louser.Result.UsersDirs.Select(w => w.DirectorateId).FirstOrDefault();
        //     var dirid = louser.DirectorateId;
        //     var user = await _db.Users.AsTracking()
        //         //.Include(m => m.UsersAsses).ThenInclude(v => v.Assistants).ThenInclude(v => v.mainassis).ThenInclude(v => v.MainIndicators)
        //         .Include(m => m.UsersDirs).ThenInclude(v => v.Directorate)
        //         //.Include(m => m.UsersSups).ThenInclude(v => v.Supervisor)
        //         .Include(m => m.UsersMeds).ThenInclude(v => v.MedicalCenter)
        //         .Include(m => m.usersClinics).ThenInclude(v => v.clinic)
        //         .Include(m => m.Roles)
        //         .Include(m => m.userstypes)
        //         .Include(m => m.usersistemaras)
        //          .Include(m => m.usersComptypes)
        //         .SingleOrDefaultAsync(u => u.Id == id);

        //     if (user == null)
        //     {

        //         return BadRequest(new ApiError(_Logger, "المستخدم غير موجود"));
        //     }

        //     //if (!user.UsersDirs.Select(w => w.DirectorateId).Contains(dirid))
        //     //{

        //     //    return BadRequest(new ApiError( _Logger,"لا تملك صلاحية"));
        //     //}
        //     if (user.DirectorateId != dirid)
        //     {

        //         return BadRequest(new ApiError(_Logger, "لا تملك صلاحية"));
        //     }
        //     var allroles = await _db.Roles.ToListAsync();
        //     var supermuder = allroles.SingleOrDefault(m => m.Name == "SuperMuder");
        //     var muder = allroles.SingleOrDefault(m => m.Name == "Muder");

        //     if (user.Roles.Count > 0)
        //     {
        //         if (user.Roles.All(r => r.RoleId == supermuder.Id))
        //         {

        //             return BadRequest(new ApiError(_Logger, "لا تملك صلاحية"));
        //         }
        //         if (user.Roles.All(r => r.RoleId == muder.Id))
        //         {
        //             return BadRequest(new ApiError(_Logger, "لا تملك صلاحية"));
        //         }
        //     }
        //     if (model.NewPassword != null && model.NewPassword.Length > 0 && model.ConfirmPassword != null && model.ConfirmPassword.Length > 0)
        //     {
        //         if (!model.ConfirmPassword.Equals(model.NewPassword))
        //         {
        //             return BadRequest(new ApiError(_Logger, "كلمة المرور وتأكيد كلمة المرور غير متطابقتان"));

        //         }
        //         if (model.ConfirmPassword.Length < 8
        //             && model.ConfirmPassword.Length > 20
        //             && model.NewPassword.Length < 8
        //             && model.NewPassword.Length > 20)
        //         {
        //             return BadRequest(new ApiError(_Logger, "كلمة المرور تتكون من 8 حروف ولا تزيد عن 20 حرف  و  تحوي حرف كبير ورقم على الاقل ورمز على الاقل"));

        //         }

        //     }
        //     if (ModelState.IsValid)
        //     {
        //         user.FullName = model.FullName;


        //         //     List<Istmara> allistmara =
        //         //   //  _db.istmaras.ToList();
        //         //   await _unitOfWork.Repository<Istmara>().GetAllListAsync();
        //         //     // List<int> userclinicint = user.usersClinics.Select(m => m.clinicId).ToList();

        //         //     List<int> usernewistmara = model.istmara;



        //         //     if (usernewistmara != null && usernewistmara.Count() == 0)
        //         //     {
        //         //         if (user.usersistemaras.Count > 0)
        //         //         {
        //         //             foreach (var item in user.usersistemaras)
        //         //             {
        //         //                 // user.UsersMeds.Remove(item);
        //         //                 _db.usersistemaras.Remove(item);
        //         //             }
        //         //         }

        //         //     }
        //         //     else
        //         //     {
        //         //         if (user.usersistemaras.Count() == 0)
        //         //         {
        //         //             if (usernewistmara != null)
        //         //             {
        //         //                 foreach (var n in usernewistmara)
        //         //                 {
        //         //                     var med = allistmara.Where(i => i.Id == n).FirstOrDefault();
        //         //                     if (med != null)
        //         //                     {
        //         //                         Usersistemara main = new Usersistemara
        //         //                         {
        //         //                             ApplicationUserId = user.Id,
        //         //                             istemaraId = n
        //         //                         };
        //         //                         //  await _db.UsersMeds.AddAsync(main);
        //         //                         user.usersistemaras.Add(main);
        //         //                     }
        //         //                 }
        //         //             }


        //         //         }
        //         //         else
        //         //         {
        //         //             var newuseristmaraid = new HashSet<int>(usernewistmara);
        //         //             var olduseristmaraid = new HashSet<int>(user.usersistemaras.Select(c => c.istemaraId));
        //         //             foreach (var istmara in allistmara)
        //         //             {
        //         //                 if (newuseristmaraid.Contains(istmara.Id))
        //         //                 {
        //         //                     if (!olduseristmaraid.Contains(istmara.Id))
        //         //                     {
        //         //                         var ist = allistmara.Where(i => i.Id == istmara.Id).FirstOrDefault();
        //         //                         if (ist != null)
        //         //                         {
        //         //                             Usersistemara main = new Usersistemara
        //         //                             {
        //         //                                 ApplicationUserId = user.Id,
        //         //                                 istemaraId = ist.Id
        //         //                             };
        //         //                             //   await _db.UsersMeds.AddAsync(main);
        //         //                             user.usersistemaras.Add(main);
        //         //                         }
        //         //                     }
        //         //                 }
        //         //                 else
        //         //                 {
        //         //                     if (olduseristmaraid.Contains(istmara.Id))
        //         //                     {
        //         //                         var useristmara = user.usersistemaras.Where(m => m.istemaraId == istmara.Id).FirstOrDefault();
        //         //                         if (useristmara != null)
        //         //                         {
        //         //                             user.usersistemaras.Remove(useristmara);
        //         //                         }

        //         //                     }
        //         //                 }
        //         //             }
        //         //         }

        //         //     }


        //         //

        //         List<UserType> allusertype =
        //         //  _db.UserTypes.ToList();
        //           await _unitOfWork.Repository<UserType>().GetAllListAsync();
        //         // List<int> userclinicint = user.usersClinics.Select(m => m.clinicId).ToList();

        //         List<int> usernewusertypeint = new List<int>();
        //         usernewusertypeint.Add(model.usertype);

        //         if (usernewusertypeint != null && usernewusertypeint.Count() == 0)
        //         {
        //             if (user.userstypes.Count > 0)
        //             {
        //                 foreach (var item in user.userstypes)
        //                 {
        //                     // user.UsersMeds.Remove(item);
        //                     _db.userstypes.Remove(item);
        //                 }
        //             }

        //         }
        //         else
        //         {
        //             if (user.userstypes.Count() == 0)
        //             {
        //                 if (usernewusertypeint != null)
        //                 {
        //                     foreach (var n in usernewusertypeint)
        //                     {
        //                         var med = allusertype.Where(i => i.Id == n).FirstOrDefault();
        //                         if (med != null)
        //                         {
        //                             UsersTypes main = new UsersTypes
        //                             {
        //                                 ApplicationUserId = user.Id,
        //                                 UserTypeId = n
        //                             };
        //                             //  await _db.UsersMeds.AddAsync(main);
        //                             user.userstypes.Add(main);
        //                         }
        //                     }
        //                 }


        //             }
        //             else
        //             {
        //                 var newusertypeid = new HashSet<int>(usernewusertypeint);
        //                 var oldusertypeid = new HashSet<int>(user.userstypes.Select(c => c.UserTypeId));
        //                 foreach (var ut in allusertype)
        //                 {
        //                     if (newusertypeid.Contains(ut.Id))
        //                     {
        //                         if (!oldusertypeid.Contains(ut.Id))
        //                         {
        //                             var cli = allusertype.Where(i => i.Id == ut.Id).FirstOrDefault();
        //                             if (cli != null)
        //                             {
        //                                 UsersTypes main = new UsersTypes
        //                                 {
        //                                     ApplicationUserId = user.Id,
        //                                     UserTypeId = ut.Id
        //                                 };
        //                                 //   await _db.UsersMeds.AddAsync(main);
        //                                 user.userstypes.Add(main);
        //                             }
        //                         }
        //                     }
        //                     else
        //                     {
        //                         if (oldusertypeid.Contains(ut.Id))
        //                         {
        //                             var usercl = user.userstypes.Where(m => m.UserTypeId == ut.Id).FirstOrDefault();
        //                             if (usercl != null)
        //                             {
        //                                 user.userstypes.Remove(usercl);
        //                             }

        //                         }
        //                     }
        //                 }
        //             }

        //         }
        //         //
        //         List<Clinic> allclinics = await _unitOfWork.Repository<Clinic>().GetAllListAsync();
        //         // _db.Clinics.ToList();
        //         // List<int> userclinicint = user.usersClinics.Select(m => m.clinicId).ToList();

        //         List<int> usernewclinicint = model.clinic;



        //         if (usernewclinicint != null && usernewclinicint.Count() == 0)
        //         {
        //             if (user.usersClinics.Count > 0)
        //             {
        //                 foreach (var item in user.usersClinics)
        //                 {
        //                     // user.UsersMeds.Remove(item);
        //                     _db.UsersClinics.Remove(item);
        //                 }
        //             }

        //         }
        //         else
        //         {
        //             if (user.usersClinics.Count() == 0)
        //             {
        //                 if (usernewclinicint != null)
        //                 {
        //                     foreach (var n in usernewclinicint)
        //                     {
        //                         var med = allclinics.Where(i => i.Id == n).FirstOrDefault();
        //                         if (med != null)
        //                         {
        //                             UsersClinic main = new UsersClinic
        //                             {
        //                                 ApplicationUserId = user.Id,
        //                                 clinicId = n
        //                             };
        //                             //  await _db.UsersMeds.AddAsync(main);
        //                             user.usersClinics.Add(main);
        //                         }
        //                     }
        //                 }


        //             }
        //             else
        //             {
        //                 var newuserclid = new HashSet<int>(usernewclinicint);
        //                 var olduserclid = new HashSet<int>(user.usersClinics.Select(c => c.clinicId));
        //                 foreach (var clinic in allclinics)
        //                 {
        //                     if (newuserclid.Contains(clinic.Id))
        //                     {
        //                         if (!olduserclid.Contains(clinic.Id))
        //                         {
        //                             var cli = allclinics.Where(i => i.Id == clinic.Id).FirstOrDefault();
        //                             if (cli != null)
        //                             {
        //                                 UsersClinic main = new UsersClinic
        //                                 {
        //                                     ApplicationUserId = user.Id,
        //                                     clinicId = clinic.Id
        //                                 };
        //                                 //   await _db.UsersMeds.AddAsync(main);
        //                                 user.usersClinics.Add(main);
        //                             }
        //                         }
        //                     }
        //                     else
        //                     {
        //                         if (olduserclid.Contains(clinic.Id))
        //                         {
        //                             var usercl = user.usersClinics.Where(m => m.clinicId == clinic.Id).FirstOrDefault();
        //                             if (usercl != null)
        //                             {
        //                                 user.usersClinics.Remove(usercl);
        //                             }

        //                         }
        //                     }
        //                 }
        //             }

        //         }


        //         //
        //         List<MedicalCenter> allmedicalcenters =
        //           await _unitOfWork.Repository<MedicalCenter>().GetAllListAsync();
        //         //  _db.MedicalCenters.ToList();

        //         List<int> usernewmedint = model.MedicalCenters;
        //         if (usernewmedint != null && usernewmedint.Count() == 0)
        //         {
        //             if (user.UsersMeds.Count > 0)
        //             {
        //                 foreach (var item in user.UsersMeds)
        //                 {
        //                     // user.UsersMeds.Remove(item);
        //                     _db.UsersMeds.Remove(item);
        //                 }
        //             }

        //         }
        //         else
        //         {
        //             if (user.UsersMeds.Count() == 0)
        //             {
        //                 if (usernewmedint != null)
        //                 {
        //                     foreach (var n in usernewmedint)
        //                     {
        //                         var med = allmedicalcenters.Where(i => i.Id == n).FirstOrDefault();
        //                         if (med != null)
        //                         {
        //                             UsersMed main = new UsersMed
        //                             {
        //                                 ApplicationUserId = user.Id,
        //                                 MedicalCenterId = n
        //                             };
        //                             //  await _db.UsersMeds.AddAsync(main);
        //                             user.UsersMeds.Add(main);
        //                         }
        //                     }
        //                 }


        //             }
        //             else
        //             {
        //                 var newusermdid = new HashSet<int>(usernewmedint);
        //                 var oldusermdid = new HashSet<int>(user.UsersMeds.Select(c => c.MedicalCenterId));
        //                 foreach (var medicalCenter in allmedicalcenters)
        //                 {
        //                     if (newusermdid.Contains(medicalCenter.Id))
        //                     {
        //                         if (!oldusermdid.Contains(medicalCenter.Id))
        //                         {
        //                             var med = allmedicalcenters.Where(i => i.Id == medicalCenter.Id).FirstOrDefault();
        //                             if (med != null)
        //                             {
        //                                 UsersMed main = new UsersMed
        //                                 {
        //                                     ApplicationUserId = user.Id,
        //                                     MedicalCenterId = medicalCenter.Id
        //                                 };
        //                                 //   await _db.UsersMeds.AddAsync(main);
        //                                 user.UsersMeds.Add(main);
        //                             }
        //                         }
        //                     }
        //                     else
        //                     {
        //                         if (oldusermdid.Contains(medicalCenter.Id))
        //                         {
        //                             var usermed = user.UsersMeds.Where(m => m.MedicalCenterId == medicalCenter.Id).FirstOrDefault();
        //                             if (usermed != null)
        //                             {
        //                                 user.UsersMeds.Remove(usermed);
        //                             }

        //                         }
        //                     }
        //                 }
        //             }

        //         }

        //         //
        //         List<Comptype> allcomptype =
        //          await _unitOfWork.Repository<Comptype>().GetAllListAsync();
        //         List<int> comptype = model.comptype;
        //         if (comptype != null && comptype.Count() == 0)
        //         {
        //             if (user.usersComptypes.Count > 0)
        //             {
        //                 foreach (var item in user.usersComptypes)
        //                 {
        //                     // user.UsersMeds.Remove(item);
        //                     _db.userscomptyps.Remove(item);
        //                 }
        //             }

        //         }
        //         else
        //         {
        //             if (user.usersComptypes != null && user.usersComptypes.Count() == 0)
        //             {
        //                 if (comptype != null && comptype.Count() > 0)
        //                 {
        //                     foreach (var n in comptype)
        //                     {

        //                         UsersCompType main = new UsersCompType
        //                         {
        //                             ApplicationUserId = user.Id,
        //                             CompTypeId = allcomptype.Where(x => x.value == n).Select(x => x.Id).FirstOrDefault()
        //                         };
        //                         await _db.userscomptyps.AddAsync(main);
        //                         // user.usersComptypes.Add(main);

        //                     }
        //                 }


        //             }
        //             else
        //             {
        //                 var newusercomptype = new HashSet<int>(comptype);
        //                 var oldusercomptype = new HashSet<int>(user.usersComptypes.Select(c => c.CompTypeId));
        //                 foreach (var ct in allcomptype)
        //                 {
        //                     if (newusercomptype.Contains(ct.value))
        //                     {
        //                         if (!oldusercomptype.Contains(ct.value))
        //                         {
        //                             UsersCompType main = new UsersCompType
        //                             {
        //                                 ApplicationUserId = user.Id,
        //                                 CompTypeId = ct.Id
        //                             };
        //                             await _db.userscomptyps.AddAsync(main);
        //                             // user.usersComptypes.Add(main);
        //                         }
        //                     }
        //                     else
        //                     {
        //                         if (oldusercomptype.Contains(ct.value))
        //                         {
        //                             var userct = user.usersComptypes.Where(m => m.CompTypeId == ct.Id).FirstOrDefault();
        //                             if (userct != null)
        //                             {
        //                                 _db.userscomptyps.Remove(userct);
        //                                 //  user.usersComptypes.Remove(userct);

        //                             }

        //                         }
        //                     }
        //                 }
        //             }

        //         }





        //         //if (user.UsersMeds.Count > 0)
        //         //{
        //         //   // List<int> usermedint = user.UsersMeds.Select(m => m.MedicalCenterId).ToList();

        //         //}
        //         //else
        //         //{
        //         //    if (model.MedicalCenters.Count > 0)
        //         //    {
        //         //        foreach (var n in model.MedicalCenters)
        //         //        {
        //         //            var medcent = allmedicalcenters.Where(i => i.Id == n).FirstOrDefault();
        //         //            if (medcent != null)
        //         //            {
        //         //                UsersMed main = new UsersMed
        //         //                {
        //         //                    ApplicationUserId = user.Id,
        //         //                    MedicalCenterId = n
        //         //                };
        //         //                await _db.UsersMeds.AddAsync(main);
        //         //            }

        //         //        }
        //         //    }
        //         //}

        //         //if (user.usersClinics.Count > 0)
        //         //{
        //         //   List<int> userclinicint = user.usersClinics.Select(m => m.clinicId).ToList();

        //         //}
        //         //  _db.SaveChanges();
        //         var result = await _userManager.UpdateAsync(user);
        //         await _db.SaveChangesAsync();
        //         if (result.Succeeded)
        //         {

        //             var USERRoles = await _userManager.GetRolesAsync(user);
        //             await _userManager.RemoveFromRolesAsync(user, USERRoles);

        //             List<string> selectedRoles = new List<string>();


        //             if (model.usertype == 1)
        //             {
        //                 selectedRoles.Add("Hosp");
        //             }
        //             if (model.usertype == 2)
        //             {
        //                 selectedRoles.Add("Clinic");
        //             }
        //             if (model.usertype == 3)
        //             {
        //                 selectedRoles.Add("HospClinic");
        //             }
        //             if (model.usertype == 4)
        //             {
        //                 selectedRoles.Add("AdminHosp");
        //             }
        //             if (model.usertype == 5)
        //             {
        //                 selectedRoles.Add("AdminClinic");
        //             }
        //             if (model.usertype == 6)
        //             {
        //                 selectedRoles.Add("AdminHospClinic");
        //             }
        //             if (model.usertype == 9)
        //             {
        //                 selectedRoles.Add("Dir973");

        //             }
        //             if (model.usertype == 99)
        //             {
        //                 selectedRoles.Add("AdminMohDir");

        //             }


        //             var roleresult = await _userManager.AddToRolesAsync(user, selectedRoles);
        //             if (!roleresult.Succeeded)
        //             {

        //                 foreach (var error in roleresult.Errors)
        //                 {
        //                     ModelState.AddModelError(string.Empty, error.Description);
        //                 }
        //                 return BadRequest(new ApiError(_Logger, ModelState));
        //             }
        //             if (model.NewPassword != null && model.NewPassword.Length > 0 && model.ConfirmPassword != null && model.ConfirmPassword.Length > 0)
        //             {
        //                 if (model.ConfirmPassword.Equals(model.NewPassword))
        //                 {
        //                     string token = await _userManager.GeneratePasswordResetTokenAsync(user);
        //                     var u = await _userManager.FindByIdAsync(user.Id);
        //                     var passresult = await _userManager.ResetPasswordAsync(u, token, model.ConfirmPassword);
        //                     if (!passresult.Succeeded)
        //                     {
        //                         return BadRequest(new ApiError(_Logger, "تم تحديث المستخدم ولم يتم تم تغير كلمة المرور"));


        //                     }
        //                 }
        //             }

        //             _Logger.LogInformation("User created a new account with password.");
        //             return Ok();
        //         }

        //     }



        //     return BadRequest(new ApiError(_Logger, ModelState));

        // }

        // [Produces("application/json")]
        // [HttpDelete("deluser/{id}")]
        // public async Task<ActionResult> del(string id)
        // {
        //     if (id == null)
        //     {
        //         return BadRequest(new ApiError(_Logger, "المستخدم غير موجود"));
        //     }
        //     var louser = CurentUser();
        //     if (louser.Id == null)
        //     {
        //         return BadRequest(new ApiError(_Logger, "الرجاء تسجيل الدخول"));
        //     }

        //     // var dirid = louser.Result.UsersDirs.Select(w => w.DirectorateId).FirstOrDefault();
        //     var dirid = louser.DirectorateId;

        //     var user = await _db.Users
        //         //.Include(m => m.UsersAsses).ThenInclude(v => v.Assistants).ThenInclude(v => v.mainassis).ThenInclude(v => v.MainIndicators)
        //         .Include(m => m.UsersDirs).ThenInclude(v => v.Directorate)
        //         //.Include(m => m.UsersSups).ThenInclude(v => v.Supervisor)
        //         .Include(m => m.UsersMeds).ThenInclude(v => v.MedicalCenter)
        //         .Include(m => m.usersClinics).ThenInclude(v => v.clinic)
        //         .Include(m => m.usersistemaras).ThenInclude(v => v.istemara)
        //         .Include(m => m.userstypes).ThenInclude(v => v.UserType)
        //         .Include(m => m.Roles)
        //         .SingleOrDefaultAsync(u => u.Id == id);

        //     if (user == null)
        //     {

        //         return BadRequest(new ApiError(_Logger, "المستخدم غير موجود"));
        //     }

        //     if (user.DirectorateId != dirid)
        //     {

        //         return BadRequest(new ApiError(_Logger, "لا تملك صلاحية"));
        //     }
        //     var allroles = await _db.Roles.ToListAsync();
        //     var supermuder = allroles.SingleOrDefault(m => m.Name == "SuperMuder");
        //     var muder = allroles.SingleOrDefault(m => m.Name == "Muder");

        //     if (user.Roles.Count > 0)
        //     {
        //         if (user.Roles.All(r => r.RoleId == supermuder.Id))
        //         {

        //             return BadRequest(new ApiError(_Logger, "لا تملك صلاحية"));
        //         }
        //         if (user.Roles.All(r => r.RoleId == muder.Id))
        //         {
        //             return BadRequest(new ApiError(_Logger, "لا تملك صلاحية"));
        //         }
        //     }

        //     if (user.UsersDirs.Count() > 0)
        //     {
        //         foreach (var item in user.UsersDirs)
        //         {
        //             _db.UsersDirs.Remove(item);


        //         }
        //     }
        //     if (user.usersClinics.Count() > 0)
        //     {
        //         foreach (var item in user.usersClinics)
        //         {
        //             _db.UsersClinics.Remove(item);

        //         }
        //     }

        //     if (user.UsersMeds.Count() > 0)
        //     {
        //         foreach (var item in user.UsersMeds)
        //         {
        //             _db.UsersMeds.Remove(item);

        //         }
        //     }
        //     if (user.userstypes.Count() > 0)
        //     {
        //         foreach (var item in user.userstypes)
        //         {
        //             _db.userstypes.Remove(item);

        //         }
        //     }
        //     if (user.usersistemaras.Count() > 0)
        //     {
        //         foreach (var item in user.usersistemaras)
        //         {
        //             _db.usersistemaras.Remove(item);

        //         }
        //     }
        //     _db.SaveChanges();
        //     var usertodelet = await _userManager.FindByIdAsync(id);
        //     var userrole = await _userManager.GetRolesAsync(usertodelet);
        //     if (userrole.Count() > 0)
        //     {
        //         var res2 = await _userManager.RemoveFromRolesAsync(usertodelet, userrole);
        //         if (!res2.Succeeded)
        //         {
        //             return BadRequest(new ApiError(_Logger, "حدث خطا ما الرجاء اعادة المحاولة"));

        //         }

        //     }
        //     var result = await _userManager.DeleteAsync(usertodelet);
        //     if (!result.Succeeded)
        //     {
        //         return BadRequest(new ApiError(_Logger, "حدث خطا ما الرجاء اعادة المحاولة"));

        //     }



        //     return Ok("(تم حذف المستخدم بنجاح شكرا لك)");




        // }
    }

}
