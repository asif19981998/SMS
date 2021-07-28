using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoukaMoukaApi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string CategoryId{ get; set; }
        public string CategoryName { get; set; }
        public string ImageStr { get; set; }
        public double UnitPrice { get; set; }
        public DateTime ManuFactureDate { get; set; }
        public DateTime ExpireDate { get; set; }

        public int ReorderLevel { get; set; }
        public string Description { get; set; }
    }
}
