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
    public class SuppliersController : ControllerBase
    {
        private readonly StockDbContext _context;

        public SuppliersController(StockDbContext context)
        {
            _context = context;
        }

        // GET: api/Suppliers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Supplier>>> GetSupplierDeatails()
        {
            return await _context.SupplierDeatails.ToListAsync();
        }

        // GET: api/Suppliers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Supplier>> GetSupplier(long id)
        {
            var supplier = await _context.SupplierDeatails.FindAsync(id);

            if (supplier == null)
            {
                return NotFound();
            }

            return supplier;
        }

        // PUT: api/Suppliers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupplier(long id, Supplier supplier)
        {
            if (id != supplier.Id)
            {
                return BadRequest();
            }

            _context.Entry(supplier).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupplierExists(id))
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

        // POST: api/Suppliers
        [HttpPost]
        public async Task<ActionResult<Supplier>> PostSupplier(Supplier supplier)
        {
           
            var dataList = _context.SupplierDeatails.AsQueryable();
            if (!string.IsNullOrEmpty(supplier.Code))
            {
                var srcByCode = dataList.Where(c => c.Code == supplier.Code);
                var srcByEmail = dataList.Where(c => c.Email == supplier.Email);
                var srcByContact = dataList.Where(c => c.Contact == supplier.Contact);
                if (srcByCode.Any() || srcByEmail.Any() || srcByContact.Any())
                {
                    return null;
                }
                else
                {
                    if (supplier.Contact.Length == 11)
                    {
                        _context.SupplierDeatails.Add(supplier);
                        await _context.SaveChangesAsync();
                       
                    }
                    else
                    {
                        return null;
                    }
                   
                }
            }
            return CreatedAtAction("GetSupplier", new { id = supplier.Id }, supplier);
        }

        // DELETE: api/Suppliers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Supplier>> DeleteSupplier(long id)
        {
            var supplier = await _context.SupplierDeatails.FindAsync(id);
            if (supplier == null)
            {
                return NotFound();
            }

            _context.SupplierDeatails.Remove(supplier);
            await _context.SaveChangesAsync();

            return supplier;
        }

        private bool SupplierExists(long id)
        {
            return _context.SupplierDeatails.Any(e => e.Id == id);
        }
        [HttpPost("SearchSpl", Name = "SearchSpl")]
        public IEnumerable<Supplier> SearchSpl(CustomerSearchVM vm)
        {

            var dataList = _context.SupplierDeatails.AsQueryable();
            if (string.IsNullOrEmpty(vm.Code) && string.IsNullOrEmpty(vm.Name) &&
                string.IsNullOrEmpty(vm.Email) && string.IsNullOrEmpty(vm.Contact) && string.IsNullOrEmpty(vm.Address))
            {


                dataList = dataList.OrderByDescending(c => c.Id).Skip(3).Take(5);
                
            }
            if (!string.IsNullOrEmpty(vm.Code))
            {
                dataList = dataList.Where(c => c.Code == vm.Code);
               
            }

            if (!string.IsNullOrEmpty(vm.Name))
            {
                dataList = dataList.Where(c => c.Name == vm.Name);
              



            }
            if (!string.IsNullOrEmpty(vm.Address))
            {
                dataList = dataList.Where(c => c.Address == vm.Address);
               


            }
            if (!string.IsNullOrEmpty(vm.Email))
            {
                dataList = dataList.Where(c => c.Email == vm.Email);
                


            }

            if (!string.IsNullOrEmpty(vm.Contact))
            {
                dataList = dataList.Where(c => c.Contact == vm.Contact);
              


            }
            return dataList; ;
        }
    }
}
