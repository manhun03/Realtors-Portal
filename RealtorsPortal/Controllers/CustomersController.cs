using RealtorsPortal.Models;
using System;
using System.Configuration;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web.Mvc;

namespace RealtorsPortal.Controllers
{
    public class CustomersController : Controller
    {
        //Instance of the DbContext class
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        //Hash password
        //Author: Le Quang Dung
        private string HashPassword(string password)
        {
            SHA256 sha256 = SHA256.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(password);
            byte[] hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        //Register
        //Author: Le Quang Dung
        public ActionResult Register()
        {
            if (Session["UserID"] != null)
            {
                return RedirectToAction("Index", "Customers");
            }

            ViewBag.Status = null;
            ViewBag.Error = null;
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Register(CustomerRegister CustomerRegister)
        {
            ViewBag.Status = null;
            ViewBag.Error = null;
            //Validate model
            if (!ModelState.IsValid)
            {
                ViewBag.Status = "Registration failed";
                return View(CustomerRegister);
            }

            //Create transaction
            var transaction = db.Database.BeginTransaction();

            try
            {
                //Check for existing email
                int userCount = db.UserAccounts.Where(u => u.Email == CustomerRegister.Email).Count();
                if (userCount > 0)
                {
                    ModelState.AddModelError("Email", "Email already existed");
                    transaction.Rollback();
                    return View(CustomerRegister);
                }

                //Create verification code
                string VerificationCode = Guid.NewGuid().ToString();

                //Insert into UserAccount
                UserAccount user = new UserAccount
                {
                    Email = CustomerRegister.Email,
                    PasswordHash = HashPassword(CustomerRegister.Password),
                    Role = "Customer",
                    CreatedAt = DateTime.Now,
                    IsActive = true,
                    VerificationCode = VerificationCode,
                    IsVerified = false
                };
                db.UserAccounts.Add(user);
                db.SaveChanges();

                //Insert into Customer
                Customer customer = new Customer
                {
                    UserID = user.UserID,
                    FullName = CustomerRegister.FullName,
                    CreatedAt = DateTime.Now,
                    CustomerType = "Normal"
                };
                db.Customers.Add(customer);
                db.SaveChanges();

                //Make changes to database if no error
                transaction.Commit();

                //Send verification email
                SendVerificationEmail(user.Email, VerificationCode);
                ViewBag.Status = "Registration succeeded, please check your email for verification";
                return View();
            }
            catch (Exception ex) 
            {
                ViewBag.Error = ex.Message;
                transaction.Rollback();
                return View(CustomerRegister);
            }
        }

        //Send verification email
        //Author: Le Quang Dung
        private void SendVerificationEmail(string email, string code)
        {
            //Create the verify url
            string verifyUrl = Url.Action("Verify", "Customers", new { email = email, code = code }, protocol: Request.Url.Scheme);

            //Create values for subject and body of the email
            string subject = "Account Verification - Realtors Portal";
            string body = "<h3>Welcome to Realtors Portal</h3>" +
                          "<p>Click the link below to verify your account:</p>" +
                         $"<a href=\"{verifyUrl}\" target=\"_blank\">Verify</a><br/>";

            //Get sender email's credentials from Web.config
            string senderEmail = ConfigurationManager.AppSettings["SenderEmail"];
            string senderPassword = ConfigurationManager.AppSettings["SenderPassword"];

            //Create the email
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(senderEmail, "Realtors Portal");
            mail.To.Add(email);
            mail.Subject = subject;
            mail.Body = body;
            mail.IsBodyHtml = true;

            //Config the sending method
            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            smtp.Credentials = new NetworkCredential(senderEmail, senderPassword);
            smtp.EnableSsl = true;

            //Send the email
            smtp.Send(mail);
        }

        //Verify account
        //Author: Le Quang Dung
        public ActionResult Verify(string email, string code)
        {
            try
            {
                //Search for account
                UserAccount account = db.UserAccounts
                                        .Where(c => c.Email == email &&
                                                    c.VerificationCode == code &&
                                                    c.IsVerified == false)
                                        .FirstOrDefault();

                //Verify account
                bool status = false;
                if (account != null)
                {
                    status = true;
                    account.IsVerified = true;
                    account.VerificationCode = null;
                    db.SaveChanges();
                }

                ViewBag.Error = null;
                ViewBag.Status = status ? "Verification succeeded" : "Verification failed";
                return View();
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                ViewBag.Status = "Verification failed";
                return View();
            }
        }

        //Login
        //Author: Le Quang Dung
        public ActionResult Login() 
        {
            if (Session["UserID"] != null)
            {
                return RedirectToAction("Index", "Customers");
            }
            ViewBag.Status = null;
            ViewBag.Error = null;
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(CustomerLogin CustomerLogin)
        {
            ViewBag.Status = null;
            ViewBag.Error = null;

            //Validate input
            if (!ModelState.IsValid)
            {
                return View(CustomerLogin);
            }

            try
            {
                string PasswordHash = HashPassword(CustomerLogin.Password);

                //Find Account
                UserAccount user = db.UserAccounts
                                     .Where(u => u.Email == CustomerLogin.Email &&
                                                 u.PasswordHash == PasswordHash)
                                     .FirstOrDefault();

                //Check credentials
                if (user == null)
                {
                    ViewBag.Status = "Unknown Email or Password";
                    return View(CustomerLogin);
                }

                //Check verify
                if (user.IsVerified == null || !(bool)user.IsVerified )
                {
                    ViewBag.Status = "Account is not verified. Visit your email to verify";
                    return View(CustomerLogin);
                }

                //Create session
                Customer customer = db.Customers.FirstOrDefault(c => c.UserID == user.UserID);
                Session["UserID"] = user.UserID;
                Session["Email"] = user.Email;
                Session["CustomerID"] = customer.CustomerID;
                Session["FullName"] = customer.FullName;

                return RedirectToAction("Index", "Customers");
            }
            catch(Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View(CustomerLogin);
            }
        }

        //Logout
        //Author: Le Quang Dung
        public ActionResult Logout()
        {
            Session.Clear();
            return RedirectToAction("Login", "Customers");
        }

        //================================================CRUD================================================
        //This section was first auto-genterated by Entity Framework 

        // GET: Customers
        public ActionResult Index()
        {
            if (Session["UserID"] == null)
            {
                return RedirectToAction("Login", "Customers");
            }
            var customers = db.Customers.Include(c => c.UserAccount);
            return View(customers.ToList());
        }

        // GET: Customers/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return HttpNotFound();
            }
            return View(customer);
        }

        // GET: Customers/Create
        public ActionResult Create()
        {
            ViewBag.UserID = new SelectList(db.UserAccounts, "UserID", "Email");
            return View();
        }

        // POST: Customers/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "CustomerID,FullName,Phone,Address,CreatedAt,CustomerType,UserID")] Customer customer)
        {
            if (ModelState.IsValid)
            {
                db.Customers.Add(customer);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.UserID = new SelectList(db.UserAccounts, "UserID", "Email", customer.UserID);
            return View(customer);
        }

        // GET: Customers/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return HttpNotFound();
            }
            ViewBag.UserID = new SelectList(db.UserAccounts, "UserID", "Email", customer.UserID);
            return View(customer);
        }

        // POST: Customers/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "CustomerID,FullName,Phone,Address,CreatedAt,CustomerType,UserID")] Customer customer)
        {
            if (ModelState.IsValid)
            {
                db.Entry(customer).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.UserID = new SelectList(db.UserAccounts, "UserID", "Email", customer.UserID);
            return View(customer);
        }

        // GET: Customers/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return HttpNotFound();
            }
            return View(customer);
        }

        // POST: Customers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Customer customer = db.Customers.Find(id);
            db.Customers.Remove(customer);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
