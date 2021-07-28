using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoukaMoukaApi.Models
{
    public class PurchaseDetail
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public long PurchaseId { get; set; }
        public Purchase Purchase { get; set; }
        public DateTime ManufactureDate { get; set; }
        public DateTime ExpireDate { get; set; }
        public string Name { get; set; }
        public double NewCostPrice { get; set; }
        public double NewMRP { get; set; }
        public long PurchaseQuantity { get; set; }
        public double TotalPrice { get; set; }
        public double UnitPrice { get; set; }
        public DateTime PurchaseDate { get; set; }
    }
}
