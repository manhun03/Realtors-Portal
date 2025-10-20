using Realtors_Portal.Models;
using System;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Web.Mvc;

namespace Realtors_Portal.Controllers
{
    public class ContactsController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        //Send contact form
        //Author: Le Quang Dung
        public ActionResult SendContact(int ListingID, int ReceiverCustomerID)
        {
            //Get ListingID and ReceiverCustomerID from the listing view
            //Then send it to the form
            Contact contact = new Contact
            {
                ListingID = ListingID,
                ReceiverCustomerID = ReceiverCustomerID
            };
            return PartialView("SendContact", contact);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SendContact(Contact contact)
        {
            try
            {
                //Validate inputs
                if (!ValidateContact(contact, out Contact validatedContact))
                {
                    return PartialView("SendContact", validatedContact);
                }

                //Check if receiver exists and get their UserAccount
                Customer receiver = db.Customers.Find(contact.ReceiverCustomerID);
                if (receiver == null)
                {
                    return HttpNotFound();
                }
                UserAccount receiverUser = db.UserAccounts.Find(receiver.UserID);
                if (receiverUser == null)
                {
                    return HttpNotFound();
                }

                //Get CustomerID from session if they're logged in
                int? SenderCustomerID = null;
                if (Session["UserID"] != null)
                {
                    int? senderUserID = Convert.ToInt32(Session["UserID"]);
                    Customer sender = db.Customers.Find(senderUserID);
                    if (sender == null)
                    {
                        return HttpNotFound();
                    }
                    SenderCustomerID = sender.CustomerID;
                }

                //Adjust other values of the contact
                contact.SenderCustomerID = SenderCustomerID;
                contact.SentAt = DateTime.Now;
                contact.IsRead = false;

                //Send the contact (save to db)
                db.Contacts.Add(contact);
                db.SaveChanges();

                //Send notification mail
                SendContactEmail(receiverUser.Email, contact.ContactID);

                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return PartialView("SendContact", contact);
            }
        }

        //Validate contact inputs
        //Author: Le Quang Dung
        private bool ValidateContact(Contact contact, out Contact validatedContact)
        {
            bool isValid = true;
            validatedContact = contact;

            //Validate SenderName
            if (string.IsNullOrWhiteSpace(contact.SenderName))
            {
                ModelState.AddModelError("SenderName", "SenderName can not be empty");
                isValid = false;
            }

            //Validate SenderEmail
            if (string.IsNullOrWhiteSpace(contact.SenderEmail))
            {
                //Check empty
                ModelState.AddModelError("SenderEmail", "SenderEmail can not be empty");
                isValid = false;
            }
            else {
                //Check format
                string emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
                if (!Regex.IsMatch(contact.SenderEmail, emailPattern))
                {
                    ModelState.AddModelError("SenderEmail", "Invalid email format");
                    isValid = false;
                }
            }

            //Validate SenderPhone
            if (string.IsNullOrWhiteSpace(contact.SenderPhone))
            {
                ModelState.AddModelError("SenderPhone", "SenderPhone can not be empty");
                isValid = false;
            }

            //Validate Message
            if (string.IsNullOrWhiteSpace(contact.Message))
            {
                ModelState.AddModelError("Message", "Message cannot be empty");
                isValid = false;
            }

            return isValid;
        }

        //Send contact notification email
        //Author: Le Quang Dung
        private void SendContactEmail(string email, int ContactID)
        { 
            //Create viewing contact url
            string contactUrl = Url.Action("Details", "Contacts", new {id = ContactID}, protocol: Request.Url.Scheme);

            //Create values for subject and body of the email
            string subject = "You have just received a contact";
            string body = "<h3>You have just received a contact</h3>" +
                          "<p>Click the link below to view the contact:</p>" +
                         $"<a href=\"{contactUrl}\" target=\"_blank\">View contact</a><br/>";

            //Get sender email's credentials from Web.config
            string senderEmail = ConfigurationManager.AppSettings["SmtpEmail"];
            string senderPassword = ConfigurationManager.AppSettings["SmtpPassword"];

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

        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Contact contact = db.Contacts.Find(id);
            if (contact == null)
            {
                return HttpNotFound();
            }
            return View(contact);
        }
    }
}
