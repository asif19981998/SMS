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
    public class PurchaseDetailsController : ControllerBase
    {
        private readonly StockDbContext _context;

        public PurchaseDetailsController(StockDbContext context)
        {
            _context = context;
        }

        // GET: api/PurchaseDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PurchaseDetail>>> GetPurchaseItemDetail()
        {
            return await _context.PurchaseDetails.ToListAsync();
        }

        // GET: api/PurchaseDetails/5
        [HttpGet("{id}")]
        public IEnumerable<PurchaseDetail> GetPurchaseDetail(long id)
        {
            //var purchaseDetail = await _context.PurchaseDetails.FindAsync(id);

            //if (purchaseDetail == null)
            //{
            //    return NotFound();
            //}

            //return purchaseDetail;

            var dt = _context.PurchaseDetails.AsQueryable();
            if (id != 0)
            {
                dt = dt.Where(res => res.PurchaseId == id);
                return dt;

            }
            return null;


        }

        // PUT: api/PurchaseDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPurchaseDetail(long id, PurchaseDetail purchaseDetail)
        {
            if (id != purchaseDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(purchaseDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseDetailExists(id))
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

        // POST: api/PurchaseDetails
        [HttpPost]
        public async Task<ActionResult<PurchaseDetail>> PostPurchaseDetail(PurchaseDetail purchaseDetail)
        {
            _context.PurchaseDetails.Add(purchaseDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPurchaseDetail", new { id = purchaseDetail.Id }, purchaseDetail);
        }

        // DELETE: api/PurchaseDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PurchaseDetail>> DeletePurchaseDetail(long id)
        {
            var purchaseDetail = await _context.PurchaseDetails.FindAsync(id);
            if (purchaseDetail == null)
            {
                return NotFound();
            }

            _context.PurchaseDetails.Remove(purchaseDetail);
            await _context.SaveChangesAsync();

            return purchaseDetail;
        }

        private bool PurchaseDetailExists(long id)
        {
            return _context.PurchaseDetails.Any(e => e.Id == id);
        }
    }
}
