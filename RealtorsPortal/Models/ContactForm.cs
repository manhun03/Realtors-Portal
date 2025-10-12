using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RealtorsPortal.Models
{
    public class ContactForm
    {
        public int ListingID { get; set; }
        public int AgentID { get; set; }
        [Required(ErrorMessage = "Name can not be empty")]
        public string SenderName { get; set; }
        [Required(ErrorMessage = "Email can not be empty")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Invalid email address.")]
        public string SenderEmail { get; set; }
        public string SenderPhone { get; set; }
        [Required(ErrorMessage = "Message can not be empty")]
        public string Message { get; set; }
    }
}