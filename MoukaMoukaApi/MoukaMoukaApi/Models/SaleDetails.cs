using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoukaMoukaApi.Models
{
    public class SaleDetails
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public long SaleId { get; set; }
        public Sales Sale { get; set; }
        public int AvailableQuantity { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}
