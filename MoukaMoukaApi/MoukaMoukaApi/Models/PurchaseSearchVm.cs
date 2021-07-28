using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoukaMoukaApi.Models
{
    public class PurchaseSearchVm
    {
        public long Id { get; set; }
        public string SupplierName { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string InvoiceNo { get; set; }


    }
}
