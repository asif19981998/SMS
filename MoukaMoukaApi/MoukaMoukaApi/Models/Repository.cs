using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoukaMoukaApi.Models
{
    public class Repository
    {
        private readonly StockDbContext _context;
        public Repository(StockDbContext context)
        {
            _context = context;
        }

        public void savedata(List<PurchaseDetail> purchaseDetails)
        {
          


        }
    }
}
