using CRUD.Model;
using CRUD.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CRUD.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet("[action]")]
    public List<User> Get()
    {
        return _userRepository.GetAllUsers();
    }

    [HttpPost("[action]")]
    public IActionResult Post([FromBody] UserDTO user)
    {
        User newUser = new User
        {
            Name = user.Name,
            Email = user.Email,
            Region = user.Region,
            Phone = user.Phone
        };
        _userRepository.AddUser(newUser);
        return Ok();
    }
    
    [HttpGet("[action]/{id}")]
    public IActionResult GetUserById([FromRoute]int id)
    {
        return Ok(_userRepository.GetUserById(id));
    }
    
    [HttpPut("[action]/{id}")]
    public IActionResult Put([FromBody] UserDTO user, [FromRoute]int id)
    {
        User newUser = new User
        {
            Name = user.Name,
            Email = user.Email,
            Region = user.Region,
            Phone = user.Phone
        };
        _userRepository.UpdateUser(newUser, id);
        return Ok();
    }
    
    [HttpDelete("[action]/{id}")]
    public IActionResult Delete([FromRoute]int id)
    {
        _userRepository.DeleteUser(id);
        return Ok();
    }
}