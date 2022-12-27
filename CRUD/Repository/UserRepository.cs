using CRUD.Model;

namespace CRUD.Repository;

public class UserRepository : IUserRepository
{
    private List<User> users = new List<User>()
    {
        new User()
        {
            Id = 1,
            Name = "John",
            Email = "john@gmail.com",
            Region = "84",
            Phone = "84911348766"
        },
        new User()
        {
            Id = 2,
            Name = "Jane",
            Email = "jane@gmail.com",
            Region = "84",
            Phone = "84911356488"
        }
    };
    
    public List<User> GetAllUsers()
    {
        return users;
    }
    
    public void AddUser(User user)
    {
        user.Id = users.Max(u => u.Id) + 1;
        users.Add(user);
    }
    
    public User GetUserById(int id)
    {
        return users.FirstOrDefault(u => u.Id == id);
    }
    
    public void UpdateUser(User user, int id)
    {
        var userToUpdate = users.FirstOrDefault(u => u.Id == id);
        if (userToUpdate != null)
        {
            userToUpdate.Name = user.Name;
            userToUpdate.Email = user.Email;
            userToUpdate.Region = user.Region;
            userToUpdate.Phone = user.Phone;
        }
    }
    
    public void DeleteUser(int id)
    {
        var userToDelete = users.FirstOrDefault(u => u.Id == id);
        if (userToDelete != null)
        {
            users.Remove(userToDelete);
        }
    }
}