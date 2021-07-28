using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoukaMoukaApi.Models
{
    public class StockInOutVm
    {
        public long? Id { get; set; }
        public string Code { get; set; }


        public string Name { get; set; }

        public Nullable<int> PurchaseQuantity { get; set; }
        public int? TotalOutQty{ get; set; }
        public int? AvailableQty{ get; set; }


    }
}
