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
    public class ProductsController : ControllerBase
    {
        private readonly StockDbContext _context;

        public ProductsController(StockDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductDetails()
        {
            return await _context.ProductDetails.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.ProductDetails.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.ProductDetails.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            var product = await _context.ProductDetails.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.ProductDetails.Remove(product);
            await _context.SaveChangesAsync();

            return product;
        }

        private bool ProductExists(int id)
        {
            return _context.ProductDetails.Any(e => e.Id == id);
        }
        [HttpPost("PrdSearch", Name="PrdSearch")]
        public IEnumerable<Product> PrdSearch(ProductSearchVm vm)
        {

            var dataList = _context.ProductDetails.AsQueryable();
            if (string.IsNullOrEmpty(vm.Name) && string.IsNullOrEmpty(vm.CategoryName) &&
                vm.UnitPrice==0&& string.IsNullOrEmpty(vm.ManufactureDate.ToString()) && 
                string.IsNullOrEmpty(vm.ExpireDate.ToString()) && vm.ReorderLevel==0)
            {


                 dataList = dataList.OrderByDescending(c => c.Id).Skip(3).Take(5);
                return dataList.ToList();

            }
          

            if (!string.IsNullOrEmpty(vm.Name))
            {
                dataList = dataList.Where(c => c.Name == vm.Name);
                return dataList.ToList();

            }
            if (!string.IsNullOrEmpty(vm.CategoryName))
            {
                dataList = dataList.Where(c => c.CategoryName == vm.CategoryName);
                return dataList.ToList();

            }
            if (vm.UnitPrice==0)
            {
                dataList = dataList.Where(c => c.UnitPrice ==vm.UnitPrice);
                return dataList.ToList();
            }
            if (!string.IsNullOrEmpty(vm.ManufactureDate.ToString()))
            {
                dataList = dataList.Where(c => c.ManuFactureDate == vm.ManufactureDate);
                return dataList.ToList();
            }
            if (!string.IsNullOrEmpty(vm.ExpireDate.ToString()))
            {
                dataList = dataList.Where(c => c.ExpireDate == vm.ExpireDate);
                return dataList.ToList();
            }
            if (vm.ReorderLevel == 0)
            {
                dataList = dataList.Where(c => c.ReorderLevel == vm.ReorderLevel);
                return dataList.ToList();
            }


            return dataList.ToList(); 
        }
    }
}
