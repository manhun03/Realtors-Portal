using Realtors_Portal.Models;
using System;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Helpers;
using System.Web.Mvc;

namespace Realtors_Portal.Controllers
{
    public class UserAccountsController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        //==================================================Register============================================

        //Register
        //Author: Nguyen Manh Hung, Le Quang Dung
        public ActionResult Register()
        {
            //Kiểm tra đăng nhập hay chưa
            var checkLogin = CheckLogin();
            if (checkLogin != null)
            {
                return checkLogin;
            }

            ViewBag.Message = null;
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Register(UserAccount user)
        {
            var transaction = db.Database.BeginTransaction();
            try
            {
                //Validate register input
                if (!ValidateRegister(user))
                {
                    transaction.Rollback();
                    return View(user);
                }

                //Create verification code
                string verificationCode = Guid.NewGuid().ToString().Substring(0, 8);

                //Hash password
                string hashedPassword = HashPassword(user.PasswordHash);

                //Insert into UserAccount
                UserAccount newUser = new UserAccount()
                {
                    Username = user.Username,
                    Email = user.Email,
                    PasswordHash = hashedPassword,
                    Role = "Customer",
                    CreatedAt = DateTime.Now,
                    IsActive = true,
                    IsVerified = false,
                    VerificationCode = verificationCode
                };
                db.UserAccounts.Add(newUser);
                db.SaveChanges();

                //Insert into Customer
                Customer newCustomer = new Customer
                {
                    UserID = newUser.UserID,
                    FullName = $"Customer-{Guid.NewGuid().ToString().Substring(0, 8)}",
                    JoinDate = DateTime.Now,
                    CustomerType = "Customer"
                };
                db.Customers.Add(newCustomer);
                db.SaveChanges();

                //Make changes to database if no error
                transaction.Commit();

                //Send verification email
                SendVerificationEmail(user.Email, verificationCode);

                ViewBag.Message = "Registration succeeded, please check your email for verification";
                return View(user);
            }
            catch (Exception ex)
            {
                ViewBag.Message = ex.Message;
                transaction.Rollback();
                return View(user);
            }
        }

        //Validate register input
        //Author: Le Quang Dung
        private bool ValidateRegister(UserAccount user)
        {
            bool isValid = true;

            //Validate UserName
            if (string.IsNullOrWhiteSpace(user.Username))
            {
                //Check empty
                ModelState.AddModelError("Username", "Username can not be empty");
                isValid = false;
            }
            else
            {
                //Check unique
                int usernameCount = db.UserAccounts.Where(u => u.Username == user.Username).Count();
                if (usernameCount > 0)
                {
                    ModelState.AddModelError("Username", "Username already existed");
                    isValid = false;
                }
            }

            //Validate Email
            if (string.IsNullOrWhiteSpace(user.Email))
            {
                //Check empty
                ModelState.AddModelError("Email", "Email can not be empty");
                isValid = false;
            }
            else
            {
                //Check format
                string emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
                if (!Regex.IsMatch(user.Email, emailPattern))
                {
                    ModelState.AddModelError("Email", "Invalid email format");
                    isValid = false;
                }
                else
                {
                    //Check unique
                    int emailCount = db.UserAccounts.Where(u => u.Email == user.Email).Count();
                    if (emailCount > 0)
                    {
                        ModelState.AddModelError("Email", "Email already existed");
                        isValid = false;
                    }
                }
            }

            //Validate Phone
            if (string.IsNullOrWhiteSpace(user.Phone))
            {
                ModelState.AddModelError("Phone", "Phone can not be empty");
                isValid = false;
            }

            //Validate Password
            if (string.IsNullOrWhiteSpace(user.PasswordHash))
            {
                ModelState.AddModelError("PasswordHash", "Password can not be empty");
                isValid = false;
            }

            return isValid;
        }

        //Email verification
        //Author: Nguyen Manh Hung, Le Quang Dung
        public ActionResult Verify(string email)
        {
            UserAccount user = new UserAccount()
            {
                Email = email
            };
            ViewBag.Message = null;
            return View(user);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Verify(UserAccount user)
        {
            bool isValid = true;
            try
            {
                //Validate Email
                if (string.IsNullOrWhiteSpace(user.Email))
                {
                    //Check empty
                    ModelState.AddModelError("Email", "Email can not be empty");
                    isValid = false;
                }
                else
                {
                    //Check format
                    string emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
                    if (!Regex.IsMatch(user.Email, emailPattern))
                    {
                        ModelState.AddModelError("Email", "Invalid email format");
                        isValid = false;
                    }
                }
                //Validate verification code
                if (string.IsNullOrWhiteSpace(user.VerificationCode))
                {
                    //Check empty
                    ModelState.AddModelError("VerificationCode", "Verification code can not be empty");
                    isValid = false;
                }

                //Validate inputs
                if (!isValid)
                {
                    return View(user);
                }

                UserAccount dbUser = db.UserAccounts.Where(u => u.Email == user.Email).FirstOrDefault();
                //Check email's existence
                if (dbUser == null)
                {
                    ModelState.AddModelError("Email", "Email hasn't been registered");
                    isValid = false;
                }
                //Check account's IsVerified
                else if ((bool)dbUser.IsVerified)
                {
                    ModelState.AddModelError("VerificationCode", "Account has already been verified");
                    isValid = false;
                }
                //Check verification code
                else if (dbUser.VerificationCode != user.VerificationCode)
                {
                    ModelState.AddModelError("VerificationCode", "VerificationCode is incorrect");
                    isValid = false;
                }

                //Check isValid
                if (isValid)
                {
                    //Verify account
                    dbUser.IsVerified = true;
                    dbUser.VerificationCode = null;
                    db.SaveChanges();
                    ViewBag.Message = "Verification succeeded";
                }
                return View();
            }
            catch (Exception ex)
            {
                ViewBag.Message = ex.Message;
                return View();
            }
        }

        //Send verification email
        //Author: Nguyen Manh Hung, Le Quang Dung
        private void SendVerificationEmail(string toEmail, string code)
        {
            //Get sender credentials from Web.config
            string fromEmail = ConfigurationManager.AppSettings["SmtpEmail"];
            string fromPassword = ConfigurationManager.AppSettings["SmtpPassword"];

            //Create verify url
            string verifyUrl = Url.Action("Verify", "UserAccounts", new { email = toEmail }, protocol: Request.Url.Scheme);

            //Create values for subject and body of the email
            string subject = "Realtors Portal - Account Verification";
            string body = "<h3>Welcome to Realtors Portal</h3>" +
                          "<p>Click the link below to open the verification page:</p>" +
                         $"<a href=\"{verifyUrl}\" target=\"_blank\">Verification Page</a><br/>" +
                         $"and enter this code: <h3><b>{code}</b></h3>";

            //Create the email
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(fromEmail, "Realtors Portal");
            mail.To.Add(toEmail);
            mail.Subject = subject;
            mail.Body = body;
            mail.IsBodyHtml = true;

            //Email sending settings
            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            smtp.Credentials = new NetworkCredential(fromEmail, fromPassword);
            smtp.EnableSsl = true;

            //Send the email
            smtp.Send(mail);
        }

        //Hash password
        //Author: Nguyen Manh Hung, Le Quang Dung
        private string HashPassword(string password)
        {
            SHA256 sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha.ComputeHash(bytes);
            return BitConverter.ToString(hash).Replace("-", "").ToLower();
        }

        //==================================================Login============================================

        //Login
        //Author: Nguyen Manh Hung, Le Quang Dung
        public ActionResult Login()
        {
            //Kiểm tra đăng nhập hay chưa
            var checkLogin = CheckLogin();
            if (checkLogin != null)
            {
                return checkLogin;
            }

            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(string Email, string PasswordHash)
        {
            if (string.IsNullOrEmpty(Email) || string.IsNullOrEmpty(PasswordHash))
            {
                ModelState.AddModelError("", "Vui lòng nhập đầy đủ thông tin!");
                return View();
            }

            var user = db.UserAccounts.FirstOrDefault(u => u.Email == Email);
            if (user == null)
            {
                ModelState.AddModelError("", "Email không tồn tại!");
                return View();
            }

            string hashed = HashPassword(PasswordHash);
            if (user.PasswordHash != hashed)
            {
                ModelState.AddModelError("", "Mật khẩu không đúng!");
                return View(user);
            }

            //Chỉ yêu cầu xác minh email với Customer hoặc Agent
            if ((user.Role == "Customer" || user.Role == "Agent") && (user.IsVerified != true))
            {
                ModelState.AddModelError("", "Tài khoản chưa được xác minh. Vui lòng kiểm tra email.");
                return View(user);
            }
            // Lấy CustomerID qua UserID
            int CustomerID = db.Customers
                    .Where(c => c.UserID == user.UserID)
                    .Select(c => c.CustomerID)
                    .FirstOrDefault();

            // Lưu thông tin đăng nhập vào Session
            Session["UserID"] = user.UserID;
            Session["CustomerID"] = CustomerID;
            Session["Email"] = user.Email;
            Session["Role"] = user.Role;

            //Chuyển hướng
            if (user.Role == "Admin" || user.Role == "Employee")
            {
                //Admin và Employee vào giao diện quản trị (/Areas/Admin)
                return RedirectToAction("Index", "Home", new { area = "Admin" });
            }
            else if (user.Role == "Agent" || user.Role == "Customer")
            {
                //Trang người dùng bình thường
                return RedirectToAction("Index", "Home");
            }

            // Mặc định fallback
            return RedirectToAction("Index", "Home");
        }

        //Logout
        //Author: Le Quang Dung
        public ActionResult Logout()
        {
            Session.Clear();
            return RedirectToAction("Login", "UserAccounts");
        }

        //Check login
        //Author: Le Quang Dung
        private ActionResult CheckLogin()
        {
            //Kiểm tra đăng nhập hay chưa
            if (Session["UserID"] != null)
            {
                //Chuyển UserID trong session sang int
                bool parse = int.TryParse(Session["UserID"].ToString(), out int UserID);
                if (!parse)
                {
                    return RedirectToAction("Login", "UserAccounts");
                }
                //Tìm kiếm user trong UserAccounts
                UserAccount user = db.UserAccounts.Where(u => u.UserID == UserID).FirstOrDefault();
                if (user == null)
                {
                    return RedirectToAction("Login", "UserAccounts");
                }

                //Chuyển hướng
                if (user.Role == "Admin" || user.Role == "Employee")
                {
                    //Admin và Employee vào giao diện Admin
                    return RedirectToAction("Index", "Home", new { area = "Admin" });
                }
                else if (user.Role == "Agent" || user.Role == "Customer")
                {
                    //Agent và Customer vào giao diện Customer
                    return RedirectToAction("Index", "Home");
                }
            }
            return null;
        }

        public ActionResult ForgotPassword()
        {
            //Kiểm tra đăng nhập hay chưa
            var checkLogin = CheckLogin();
            if (checkLogin != null)
            {
                return checkLogin;
            }

            return View();
        }

        [HttpPost]
        public ActionResult ForgotPassword(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                ModelState.AddModelError("", "Vui lòng nhập đầy đủ thông tin!");
                return View();
            }
            var user = db.UserAccounts.FirstOrDefault(u => u.Email == email);
            if (user == null)
            {
                ModelState.AddModelError("", "Email không tồn tại!");
                return View();
            }

            //Tạo mật khẩu mới
            string newPassword = Guid.NewGuid().ToString().Substring(0, 8);
            string hashedPassword = HashPassword(newPassword);

            //Thay đổi mật khẩu trong csdl
            user.PasswordHash = hashedPassword;
            db.Entry(user).State = EntityState.Modified;
            db.SaveChanges();

            //Gửi email chứa mật khẩu mới
            SendChangePasswordEmail(email, newPassword);
            ModelState.AddModelError("", "Hãy đăng nhập bằng mật khẩu mới gửi về email, và đổi mật khẩu");

            return View();
        }

        public void SendChangePasswordEmail(string email, string password)
        {
            //Get sender credentials from Web.config
            string fromEmail = ConfigurationManager.AppSettings["SmtpEmail"];
            string fromPassword = ConfigurationManager.AppSettings["SmtpPassword"];

            //Create values for subject and body of the email
            string subject = "Realtors Portal - Reset Password";
            string body = "<h3>Password Reset</h3>" +
                          "<p>Use this new password to login:</p>" +
                         $"<h3><b>{password}</b></h3>";

            //Create the email
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(fromEmail, "Realtors Portal");
            mail.To.Add(email);
            mail.Subject = subject;
            mail.Body = body;
            mail.IsBodyHtml = true;

            //Email sending settings
            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            smtp.Credentials = new NetworkCredential(fromEmail, fromPassword);
            smtp.EnableSsl = true;

            //Send the email
            smtp.Send(mail);
        }
    }
}
