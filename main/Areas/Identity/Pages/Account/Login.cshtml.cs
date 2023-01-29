namespace main.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class LoginModel : PageModel
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        // private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger<LoginModel> _logger;

        public LoginModel(SignInManager<ApplicationUser> signInManager,
            //ApplicationDbContext db,
            IHttpContextAccessor httpContextAccessor,
            ILogger<LoginModel> logger,
            UserManager<ApplicationUser> userManager)
        {
            //  _context = db;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        public string ReturnUrl { get; set; }

        [TempData]
        public string ErrorMessage { get; set; }

        public class InputModel
        {
            [Required(ErrorMessage = "الرجاء كتابة  أسم المستخدم")]
            // [EmailAddress]
            public string Email { get; set; }

            [Required(ErrorMessage = " الرجاء كتابة  كلمة المرور")]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            [Display(Name = "تذكرنى")]

            public bool RememberMe { get; set; }
        }

        public async Task OnGetAsync(string returnUrl = "")
        {
            if (!string.IsNullOrEmpty(ErrorMessage))
            {
                ModelState.AddModelError(string.Empty, ErrorMessage);
            }

            returnUrl = returnUrl ?? Url.Content("~/");

            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);
            string ReturnUrlok = "";
            if (!String.IsNullOrEmpty(returnUrl))
            {
               
                    ReturnUrlok = returnUrl;
               
            }

            ReturnUrl = ReturnUrlok;
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = "")
        {
            returnUrl = returnUrl ?? Url.Content("~/");

            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                string username = Input.Email.ToLower();
                var result = await _signInManager.PasswordSignInAsync(username, Input.Password, Input.RememberMe, lockoutOnFailure: false);
                string ReturnUrlok = "";
                if (!String.IsNullOrEmpty(returnUrl))
                {
                   
                        ReturnUrlok = returnUrl;
                   
                }
                if (Url.IsLocalUrl(ReturnUrlok))
                {
                    return Redirect(ReturnUrlok);
                }
          
                if (result.IsLockedOut)
                {
                    _logger.LogWarning("User account locked out.");
                    return RedirectToPage("./Lockout");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, " اسم المستخدم أو كلمة المرور غير صحيحة  ");
                    return Page();
                }
            }

            // If we got this far, something failed, redisplay form
            return Page();
        }
    }
}
