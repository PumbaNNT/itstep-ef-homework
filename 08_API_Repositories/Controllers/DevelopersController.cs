using GamesApi.Entities;
using GamesApi.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace GamesApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DevelopersController(IDeveloperRepository repository) : ControllerBase
{
    // GET api/developers
    [HttpGet]
    public async Task<ActionResult<List<Developer>>> GetAll() =>
        Ok(await repository.GetAllAsync());

    // GET api/developers/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Developer>> GetById(int id)
    {
        var developer = await repository.GetByIdAsync(id);
        return developer is null ? NotFound() : Ok(developer);
    }

    // POST api/developers
    [HttpPost]
    public async Task<ActionResult<Developer>> Create(Developer developer)
    {
        developer.Id = 0;
        developer.Games = new();
        var created = await repository.CreateAsync(developer);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    // PUT api/developers/5
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Developer developer)
    {
        if (developer.Id != 0 && developer.Id != id)
            return BadRequest("Id в маршруті та в тілі запиту не співпадають");

        developer.Id = id;
        return await repository.UpdateAsync(developer) ? NoContent() : NotFound();
    }

    // DELETE api/developers/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id) =>
        await repository.DeleteAsync(id) ? NoContent() : NotFound();
}
