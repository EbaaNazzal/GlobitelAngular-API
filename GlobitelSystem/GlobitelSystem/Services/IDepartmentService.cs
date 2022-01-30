using GlobitelSystem.Data;
using System.Collections.Generic;

namespace GlobitelSystem.Services
{
    public interface IDepartmentService
    {
        void Insert(Department department);
        List<Department> GetAllDepartment();
    }
}