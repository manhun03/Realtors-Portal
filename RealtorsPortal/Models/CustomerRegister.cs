using System.ComponentModel.DataAnnotations;

namespace RealtorsPortal.Models
{
    public class CustomerRegister
    {
        //UserAccount
        [Required(ErrorMessage = "Email can not be empty")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password can not be empty")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Confirm password can not be empty")]
        [Compare("Password", ErrorMessage = "Password and confirm password must be the same")]
        public string ConfirmPassword { get; set; }

        //Customer
        [Required(ErrorMessage = "Fullname can not be empty")]
        public string FullName { get; set; }
    }
}