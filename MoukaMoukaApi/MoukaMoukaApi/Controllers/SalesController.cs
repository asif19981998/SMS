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
    public class SalesController : ControllerBase
    {
        private readonly StockDbContext _context;

        public SalesController(StockDbContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSale()
        {
            return await _context.Sale.ToListAsync();
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sales>> GetSales(long id)
        {
            var sales = await _context.Sale.FindAsync(id);

            if (sales == null)
            {
                return NotFound();
            }

            return sales;
        }

        // PUT: api/Sales/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSales(long id, Sales sales)
        {
            if (id != sales.Id)
            {
                return BadRequest();
            }

            _context.Entry(sales).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesExists(id))
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

        // POST: api/Sales
        [HttpPost]
        public async Task<ActionResult<Sales>> PostSales(Sales sales)
        {
            _context.Sale.Add(sales);
            await _context.SaveChangesAsync();

            foreach (var item in sales.SaleDetails)
            {

         
                var data = _context.Stock.FirstOrDefault(c => c.Code.Equals(item.Code));

          



                if (data != null)
                {
                    data.Quantity -= item.Quantity;
                    _context.Stock.Update(data);
                    await _context.SaveChangesAsync();
                }
             
            }

            return CreatedAtAction("GetSales", new { id = sales.Id }, sales);
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sales>> DeleteSales(long id)
        {
            var sales = await _context.Sale.FindAsync(id);
            if (sales == null)
            {
                return NotFound();
            }

            _context.Sale.Remove(sales);
            await _context.SaveChangesAsync();

            return sales;
        }

        private bool SalesExists(long id)
        {
            return _context.Sale.Any(e => e.Id == id);
        }
        [HttpPost("SearchSale",Name= "SearchSale")]
        public IEnumerable<Sales> SearchSale(SaleSearchVm vm)
        {
            try
            {
                var slList = _context.Sale.AsQueryable();
                if (!string.IsNullOrEmpty(vm.CustomerName))
                {
                    slList = slList.Where(c => c.CustomerName == vm.CustomerName); ;
                    
                   
                }
                if (!string.IsNullOrEmpty(vm.StartDate))
                {
                    slList = slList.Where(c => c.Date >= Convert.ToDateTime(vm.StartDate));
                }
                if (!string.IsNullOrEmpty(vm.EndDate))
                {
                    slList = slList.Where(c => c.Date <= Convert.ToDateTime(vm.EndDate));
                }

                return slList; 

            }
            catch (Exception)
            {
                throw;          
            }
            
           
        }
    }
}
