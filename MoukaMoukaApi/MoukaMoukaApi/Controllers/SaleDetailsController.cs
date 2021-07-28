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
    public class SaleDetailsController : ControllerBase
    {
        private readonly StockDbContext _context;

        public SaleDetailsController(StockDbContext context)
        {
            _context = context;
        }

        // GET: api/SaleDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SaleDetails>>> GetSaleDetails()
        {
            return await _context.SaleDetails.ToListAsync();
        }

        // GET: api/SaleDetails/5
        [HttpGet("{id}")]
        public IEnumerable<SaleDetails> GetSaleDetails(long id)
        {
            //var saleDetails = await _context.SaleDetails.FindAsync(id);

            //if (saleDetails == null)
            //{
            //    return NotFound();
            //}

            //return saleDetails;

            var dt = _context.SaleDetails.AsQueryable();
            if (id != 0)
            {
                dt = dt.Where(res => res.SaleId == id);
                return dt;

            }
            return null;
        }

        // PUT: api/SaleDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSaleDetails(long id, SaleDetails saleDetails)
        {
            if (id != saleDetails.Id)
            {
                return BadRequest();
            }

            _context.Entry(saleDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleDetailsExists(id))
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

        // POST: api/SaleDetails
        [HttpPost]
        public async Task<ActionResult<SaleDetails>> PostSaleDetails(SaleDetails saleDetails)
        {
            _context.SaleDetails.Add(saleDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSaleDetails", new { id = saleDetails.Id }, saleDetails);
        }

        // DELETE: api/SaleDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SaleDetails>> DeleteSaleDetails(long id)
        {
            var saleDetails = await _context.SaleDetails.FindAsync(id);
            if (saleDetails == null)
            {
                return NotFound();
            }

            _context.SaleDetails.Remove(saleDetails);
            await _context.SaveChangesAsync();

            return saleDetails;
        }

        private bool SaleDetailsExists(long id)
        {
            return _context.SaleDetails.Any(e => e.Id == id);
        }
        [HttpPost("SaleDetail",Name= "SaleDetail")]
        public IEnumerable<SaleDetails> SaleDetail(SaleDetailsVm Id)
        {
            var dt = _context.SaleDetails.AsQueryable();
            if(Id.id != 0)
            {
                dt = dt.Where(res => res.SaleId == Id.id);
                return dt;

            }
            return null;
        }
    }
}
