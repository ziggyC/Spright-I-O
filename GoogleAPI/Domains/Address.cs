using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sabio.Web.Domain
{
    public class Address
    {
        public int Id { get;  set; }
        public string Line { get; set; }
        public string LineTwo { get; set; }
        public string City { get; set; }
        public string StateId { get; set; }
        public int ZipCode { get; set; }
        public string UserID { get; set;}
        public Decimal Latitude { get; set; }
        public Decimal Longitude { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime DateModified { get; set; }

    }
}