using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoukaMoukaApi.Models
{
    public class Stock
    {
        public long Id { get; set; }
        public string ProductName { get; set; }
        public string Code { get; set; }
        public long Quantity { get; set; }
        public double UnitPrice { get; set; }



    }
}
