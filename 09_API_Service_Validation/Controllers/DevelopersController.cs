using GamesApi.Dtos;
using GamesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace GamesApi.Controllers;

// Controller <-> Service <-> Repository
[ApiController]
[Route("api/[controller]")]
public class DevelopersController(IDeveloperService service) : ControllerBase
{
    // GET api/developers
    [HttpGet]
    public async Task<ActionResult<List<DeveloperDto>>> GetAll() =>
        Ok(await service.GetAllAsync());

    // GET api/developers/5
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<DeveloperDto>> GetById(int id)
    {
        var developer = await service.GetByIdAsync(id);
        return developer is null ? NotFound() : Ok(developer);
    }

    // POST api/developers
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<DeveloperDto>> Create(CreateDeveloperDto dto)
    {
        var created = await service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    // PUT api/developers/5
    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, UpdateDeveloperDto dto) =>
        await service.UpdateAsync(id, dto) ? NoContent() : NotFound();

    // DELETE api/developers/5
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id) =>
        await service.DeleteAsync(id) ? NoContent() : NotFound();
}
