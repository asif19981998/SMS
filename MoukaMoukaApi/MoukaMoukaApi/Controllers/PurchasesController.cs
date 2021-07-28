using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoukaMoukaApi.Models;

namespace MoukaMoukaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchasesController : ControllerBase
    {
        private readonly StockDbContext _context;


        public PurchasesController(StockDbContext context)
        {
            _context = context;
        }

        // GET: api/Purchases
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Purchase>>> GetPurchaseDetail()
        {

            //var a = _context.Set<StockInOutVm>().FromSql("In_Out_View");
            //var b = _context.Database.FromSql("SELECT * FROM In_Out_View");


            return await _context.Purchases.ToListAsync();
        }

        // GET: api/Purchases/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Purchase>> GetPurchase(long id)
        {
            var purchase = await _context.Purchases.FindAsync(id);

            if (purchase == null)
            {
                return NotFound();
            }

            return purchase;
        }

        // PUT: api/Purchases/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPurchase(long id, Purchase purchase)
        {
            if (id != purchase.Id)
            {
                return BadRequest();
            }

            _context.Entry(purchase).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Purchases
        [HttpPost]
        public async Task<ActionResult<Purchase>> PostPurchase(Purchase purchase)
        {



            _context.Purchases.Add(purchase);
            await _context.SaveChangesAsync();


            foreach (var item in purchase.PurchaseDetails)
            {

                //var data = _context.Stock.getElementById(Convert.ToInt32(item.Code));
                var data = _context.Stock.FirstOrDefault(c => c.Code.Equals(item.Code));

                // var data =_context.Stock.Find(Convert.ToInt32(item.Code))



                if (data != null)
                {
                    data.Quantity += item.PurchaseQuantity;
                    _context.Stock.Update(data);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    Stock stock = new Stock();
                    stock.ProductName = item.Name;
                    stock.Code = item.Code;
                    stock.Quantity = item.PurchaseQuantity;
                    stock.UnitPrice= item.UnitPrice;
                    _context.Stock.Add(stock);
                    await _context.SaveChangesAsync();
                }
            }

















            return CreatedAtAction("GetPurchase", new { id = purchase.Id }, purchase);
        }

        // DELETE: api/Purchases/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Purchase>> DeletePurchase(long id)
        {
            var purchase = await _context.Purchases.FindAsync(id);
            if (purchase == null)
            {
                return NotFound();
            }

            _context.Purchases.Remove(purchase);
            await _context.SaveChangesAsync();

            return purchase;
        }

        private bool PurchaseExists(long id)
        {
            return _context.Purchases.Any(e => e.Id == id);
        }
        [HttpPost("SearchPurchase", Name = "SearchPurchase")]
        public IEnumerable<Purchase> SearchPurchase(PurchaseSearchVm vm)
        {
            try
            {
                var slList = _context.Purchases.AsQueryable();
                if (!string.IsNullOrEmpty(vm.SupplierName))
                {
                    slList = slList.Where(c => c.SupplierName == vm.SupplierName); ;


                }
                if (!string.IsNullOrEmpty(vm.StartDate))
                {
                    slList = slList.Where(c => c.Date >= Convert.ToDateTime(vm.StartDate));
                }
                if (!string.IsNullOrEmpty(vm.EndDate))
                {
                    slList = slList.Where(c => c.Date <= Convert.ToDateTime(vm.EndDate));
                }
                if (!string.IsNullOrEmpty(vm.InvoiceNo))
                {
                    slList = slList.Where(c => c.InvoiceNo == vm.InvoiceNo);
                }
                return slList.ToList();

            }
            catch (Exception)
            {
                throw;
            }


        }
    }
}
