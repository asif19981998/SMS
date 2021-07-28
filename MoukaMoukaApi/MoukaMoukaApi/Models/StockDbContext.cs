using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MoukaMoukaApi.Models;

namespace MoukaMoukaApi.Models
{
    public class StockDbContext:DbContext
    {
         public StockDbContext(DbContextOptions<StockDbContext> options) : base(options)
        {

        }

        public DbSet<Product> ProductDetails { get; set; }
        public DbSet<Category> CategoryDetails { get; set; }
        public DbSet<Supplier> SupplierDeatails { get; set; }
        public DbSet<Customer> CustomerDeatails { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<PurchaseDetail> PurchaseDetails { get; set; }
        public DbSet<Sales> Sale { get; set; }
        public DbSet<SaleDetails> SaleDetails { get; set; }
        public DbSet<Stock> Stock { get; set; }
        public DbSet<MoukaMoukaApi.Models.CustomerSearchVM> CustomerSearchVM { get; set; }
     


       

    }

}

