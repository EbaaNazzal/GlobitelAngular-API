using GlobitelSystem.Data;
using GlobitelSystem.DTO;
using System.Collections.Generic;

namespace GlobitelSystem.Services
{
    public interface IEmployeeService
    {
        List<Employee> GetAllEmployee();
        Employee GetEmployeeById(int id);
        void Update(Employee employee);
        void Insert(Employee employee);
        void Delete(int id);
        List<ActiveEmployee> GetActiveEmployees();
    }
}