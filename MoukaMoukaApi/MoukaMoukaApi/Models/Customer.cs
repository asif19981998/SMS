using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoukaMoukaApi.Models
{
    public class Customer
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string LoyalityPoint { get; set; }
    }
}
