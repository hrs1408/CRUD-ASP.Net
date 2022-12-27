using CRUD.Model;

namespace CRUD.Repository;

public interface IUserRepository
{
    public List<User> GetAllUsers();
    
    public void AddUser(User user);
    
    public User GetUserById(int id);
    
    public void UpdateUser(User user, int id);
    
    public void DeleteUser(int id);
}