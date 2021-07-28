using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoukaMoukaApi.Models
{
    public class Purchase
    {
        public long Id { get; set; }
        public DateTime Date { get; set; }
        public string InvoiceNo { get; set; }
        public string SupplierName { get; set; }
        public double GrandTotal { get; set; }
        public string SupplierId { get; set; }
        public List<PurchaseDetail> PurchaseDetails { get; set; }
        public List<Stock> Stock { get; set; }
    }
}
