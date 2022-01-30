using GlobitelSystem.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GlobitelSystem.Services
{
    public class DepartmentService: IDepartmentService
    {
        GlobitelContext context;
        public DepartmentService(GlobitelContext _context)
        {
            context = _context;
        }

        public List<Department> GetAllDepartment()
        {
            List<Department> liDepartment = context.Departments.ToList();
            return liDepartment;
        }

        public void Insert(Department department)
        {
            context.Departments.Add(department);
            context.SaveChanges();
        }
    }
}
