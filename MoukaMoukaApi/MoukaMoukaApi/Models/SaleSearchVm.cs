using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoukaMoukaApi.Models
{
    public class SaleSearchVm
    {
        public long? Id { get; set; }
        public string CustomerName { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
    }
}
