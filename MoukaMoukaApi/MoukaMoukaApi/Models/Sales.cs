using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoukaMoukaApi.Models
{
    public class Sales
    {
        public long Id { get; set; }
        public string CustomerId { get; set; }
        public string CustomerName { get; set; }
        public DateTime Date { get; set; }

        public string LoyalityPoint { get; set; }
        public decimal GrandTotal { get; set; }
        public decimal Due { get; set; }
        public decimal Paid { get; set; }
        public List<SaleDetails> SaleDetails { get; set; }

    }
}
