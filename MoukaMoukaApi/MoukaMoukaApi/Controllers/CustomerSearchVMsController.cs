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
    public class CustomerSearchVMsController : ControllerBase
    {
        private readonly StockDbContext _context;

        public CustomerSearchVMsController(StockDbContext context)
        {
            _context = context;
        }

        // GET: api/CustomerSearchVMs
        [HttpGet]
        //public List<Customer> GetCustomerSearchVM(CustomerSearchVM vm)
        //{
        //    var dataList = _context.CustomerDeatails.AsQueryable();
        //    if (!string.IsNullOrEmpty(vm.Code))
        //    {
        //        dataList = dataList.Where(c => c.Code == vm.Code);
        //    }
        //    int count = dataList.Count();
        //    var dinalData = dataList.OrderByDescending(c => c.Id).Skip(80).Take(20).ToList();
        //    //return ;
        //    return dinalData;
        //}

        // GET: api/CustomerSearchVMs/5

        [Route("api/Customer/CustomerSearchVMs/vm")]
        //[]
        public List<Customer> CustomerSearchVMs(CustomerSearchVM data)
        {
            var dataList = _context.CustomerDeatails.AsQueryable();
            if (!string.IsNullOrEmpty(data.Code))
            {
                dataList = dataList.Where(c => c.Code == data.Code);
            }
            int count = dataList.Count();
            var dinalData = dataList.OrderByDescending(c => c.Id).Skip(80).Take(20).ToList();
         
            return dinalData;
        }
        //public async Task<ActionResult<CustomerSearchVM>> GetCustomerSearchVM(long id)
        //{
        //    var customerSearchVM = await _context.CustomerSearchVM.FindAsync(id);

        //    if (customerSearchVM == null)
        //    {
        //        return NotFound();
        //    }

        //    return customerSearchVM;
        //}

        // PUT: api/CustomerSearchVMs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerSearchVM(long id, CustomerSearchVM customerSearchVM)
        {
            if (id != customerSearchVM.Id)
            {
                return BadRequest();
            }

            _context.Entry(customerSearchVM).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerSearchVMExists(id))
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

        // POST: api/CustomerSearchVMs
        [HttpPost]
        public async Task<ActionResult<CustomerSearchVM>> PostCustomerSearchVM(CustomerSearchVM customerSearchVM)
        {
            _context.CustomerSearchVM.Add(customerSearchVM);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomerSearchVM", new { id = customerSearchVM.Id }, customerSearchVM);
        }

        // DELETE: api/CustomerSearchVMs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CustomerSearchVM>> DeleteCustomerSearchVM(long id)
        {
            var customerSearchVM = await _context.CustomerSearchVM.FindAsync(id);
            if (customerSearchVM == null)
            {
                return NotFound();
            }

            _context.CustomerSearchVM.Remove(customerSearchVM);
            await _context.SaveChangesAsync();

            return customerSearchVM;
        }

        private bool CustomerSearchVMExists(long id)
        {
            return _context.CustomerSearchVM.Any(e => e.Id == id);
        }
    }
}
