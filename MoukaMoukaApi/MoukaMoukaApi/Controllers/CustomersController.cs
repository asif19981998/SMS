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
    public class CustomersController : ControllerBase
    {
        private readonly StockDbContext _context;

        public CustomersController(StockDbContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomerDeatails()
        {
            List<string> customers = new List<string>()
            {
                "Tamim",
                "Nafix"
            };
            //return await _context.CustomerDeatails.ToListAsync();
            return Ok(customers);
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(long id)
        {
            var customer = await _context.CustomerDeatails.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Customers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(long id, Customer customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        // POST: api/Customers
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            var dataList = _context.CustomerDeatails.AsQueryable();
            if (!string.IsNullOrEmpty(customer.Code))
            {
                var srcByCode= dataList.Where(c => c.Code == customer.Code);
                var srcByEmail = dataList.Where(c => c.Email == customer.Email);
                var srcByContact = dataList.Where(c => c.Contact == customer.Contact);
                if (srcByCode.Any() || srcByEmail.Any() || srcByContact.Any())
                {
                    return null;
                }
                else
                {
                    _context.CustomerDeatails.Add(customer);
                    await _context.SaveChangesAsync();
                }
            }

           

            return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(long id)
        {
            var customer = await _context.CustomerDeatails.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.CustomerDeatails.Remove(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        private bool CustomerExists(long id)
        {
            return _context.CustomerDeatails.Any(e => e.Id == id);
        }


        //[Route("api/Customers/Search")]
        [HttpPost("Search",Name="Search")]
      
        public IEnumerable<Customer> Search(CustomerSearchVM vm)
        {
             
            var dataList = _context.CustomerDeatails.AsQueryable();
            if (string.IsNullOrEmpty(vm.Code)&& string.IsNullOrEmpty(vm.Name)&& 
                string.IsNullOrEmpty(vm.Email)&& string.IsNullOrEmpty(vm.Contact)&& string.IsNullOrEmpty(vm.Address))
            {

                
                var allData = dataList.OrderByDescending(c => c.Id).Skip(3).Take(5).ToList();
                return allData;
            }
         if (!string.IsNullOrEmpty(vm.Code))
            {
                dataList = dataList.Where(c => c.Code == vm.Code);
                int count = dataList.Count();
                var dinalDataCode = dataList.OrderByDescending(c => c.Id).ToList();
                return dinalDataCode;
            }
           
             if (!string.IsNullOrEmpty(vm.Name))
            {
                dataList = dataList.Where(c => c.Name == vm.Name);
                int count = dataList.Count();
               var dinalDataName = dataList.OrderByDescending(c => c.Id).ToList();
                return dinalDataName;



            }
            if (!string.IsNullOrEmpty(vm.Address))
            {
                dataList = dataList.Where(c => c.Address == vm.Address);
                int count = dataList.Count();
                var dinalDataAddress = dataList.OrderByDescending(c => c.Id).ToList();
                return dinalDataAddress;


            }
            if (!string.IsNullOrEmpty(vm.Email))
            {
                dataList = dataList.Where(c => c.Email == vm.Email);
                int count = dataList.Count();
                var dinalDataEmail = dataList.OrderByDescending(c => c.Id).ToList();
                return dinalDataEmail;


            }

            if (!string.IsNullOrEmpty(vm.Contact))
            {
                dataList = dataList.Where(c => c.Contact == vm.Contact);
                int count = dataList.Count();
             var dinalDataContact = dataList.OrderByDescending(c => c.Id).ToList();
                return dinalDataContact;
              

            }
            return null; ;
        }
           


        }
    }

