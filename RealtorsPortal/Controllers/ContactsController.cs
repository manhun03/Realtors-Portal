using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using RealtorsPortal.Models;

namespace RealtorsPortal.Controllers
{
    public class ContactsController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        //Send contact form
        //Author: Le Quang Dung
        public ActionResult SendContact(int ListingID, int AgentID)
        {
            //Get ListingID (if there is), and AgentID from the view
            //Then send it to the form
            ContactForm contactForm = new ContactForm
            {
                ListingID = ListingID,
                AgentID = AgentID
            };
            return View(contactForm);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SendContact(ContactForm ContactForm) 
        {
            //Validate form input
            if (!ModelState.IsValid)
            {
                return View();
            }
            try
            {
                //Get CustomerID from session if they're logged in
                int? CustomerID = null;
                if (Session["CustomerID"] != null)
                {
                    CustomerID = Convert.ToInt32(Session["CustomerID"]);
                }

                //Create the contact
                Contact contact = new Contact
                {
                    ListingID = ContactForm.ListingID,
                    AgentID = ContactForm.AgentID,
                    CustomerID = CustomerID,
                    SenderName = ContactForm.SenderName,
                    SenderEmail = ContactForm.SenderEmail,
                    SenderPhone = ContactForm.SenderPhone,
                    Message = ContactForm.Message,
                    SentAt = DateTime.Now,
                    IsRead = false
                };

                //Send the contact
                db.Contacts.Add(contact);
                db.SaveChanges();

                return View();
            } catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return View();
            }
        }
        //================================================CRUD================================================
        //This section was first auto-genterated by Entity Framework 

        // GET: Contacts
        public ActionResult Index()
        {
            var contacts = db.Contacts.Include(c => c.Customer).Include(c => c.Customer1).Include(c => c.Listing);
            return View(contacts.ToList());
        }

        // GET: Contacts/Details/5
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

            //Check IsRead
            if (contact.IsRead != true)
            {
                contact.IsRead = true;
                db.SaveChanges();
            }
            return View(contact);
        }

        // GET: Contacts/Create
        public ActionResult Create()
        {
            ViewBag.AgentID = new SelectList(db.Customers, "CustomerID", "FullName");
            ViewBag.CustomerID = new SelectList(db.Customers, "CustomerID", "FullName");
            ViewBag.ListingID = new SelectList(db.Listings, "ListingID", "Title");
            return View();
        }

        // POST: Contacts/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ContactID,ListingID,AgentID,CustomerID,SenderName,SenderEmail,SenderPhone,Message,SentAt,IsRead")] Contact contact)
        {
            if (ModelState.IsValid)
            {
                db.Contacts.Add(contact);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.AgentID = new SelectList(db.Customers, "CustomerID", "FullName", contact.AgentID);
            ViewBag.CustomerID = new SelectList(db.Customers, "CustomerID", "FullName", contact.CustomerID);
            ViewBag.ListingID = new SelectList(db.Listings, "ListingID", "Title", contact.ListingID);
            return View(contact);
        }

        // GET: Contacts/Edit/5
        public ActionResult Edit(int? id)
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
            ViewBag.AgentID = new SelectList(db.Customers, "CustomerID", "FullName", contact.AgentID);
            ViewBag.CustomerID = new SelectList(db.Customers, "CustomerID", "FullName", contact.CustomerID);
            ViewBag.ListingID = new SelectList(db.Listings, "ListingID", "Title", contact.ListingID);
            return View(contact);
        }

        // POST: Contacts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ContactID,ListingID,AgentID,CustomerID,SenderName,SenderEmail,SenderPhone,Message,SentAt,IsRead")] Contact contact)
        {
            if (ModelState.IsValid)
            {
                db.Entry(contact).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.AgentID = new SelectList(db.Customers, "CustomerID", "FullName", contact.AgentID);
            ViewBag.CustomerID = new SelectList(db.Customers, "CustomerID", "FullName", contact.CustomerID);
            ViewBag.ListingID = new SelectList(db.Listings, "ListingID", "Title", contact.ListingID);
            return View(contact);
        }

        // GET: Contacts/Delete/5
        public ActionResult Delete(int? id)
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

        // POST: Contacts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Contact contact = db.Contacts.Find(id);
            db.Contacts.Remove(contact);
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
