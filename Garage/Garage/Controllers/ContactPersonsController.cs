using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Garage.Data;
using Garage.Models;

namespace Garage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactPersonsController : ControllerBase
    {
        private readonly GarageContext _context;

        public ContactPersonsController(GarageContext context)
        {
            _context = context;
        }
        
        // GET: api/ContactPersons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactPerson>>> GetContactPerson()
        {
            if (_context.ContactPersons != null)
                return Ok(await _context.ContactPersons);

            return NotFound();
        }

        // GET: api/ContactPersons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContactPerson>> GetContactPerson(int id)
        {
            var contactPerson = _context.ContactPersons.Result.FirstOrDefault(cas => cas.Id == id);

            if (contactPerson == null)
            {
                return NotFound();
            }

            return contactPerson;
        }

        // PUT: api/ContactPersons/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContactPerson(int id, ContactPerson contactPersonUpdate)
        {
            var contactPerson = _context.ContactPersons.Result.FirstOrDefault(cas => cas.Id == id);

            _context.ContactPersons.Result.Remove(contactPerson);
            _context.ContactPersons.Result.Add(contactPersonUpdate);

            return NoContent();
        }

        // POST: api/ContactPersons
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ContactPerson>> PostContactPerson(ContactPerson contactPerson)
        {

            _context.ContactPersons.Result.Add(contactPerson);
            return NoContent();
        }

        // DELETE: api/ContactPersons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContactPerson(int id)
        {
            var contactPerson = _context.ContactPersons.Result.FirstOrDefault(cas => cas.Id == id);

            _context.ContactPersons.Result.Remove(contactPerson);

            return NoContent();
        }

    }
}
