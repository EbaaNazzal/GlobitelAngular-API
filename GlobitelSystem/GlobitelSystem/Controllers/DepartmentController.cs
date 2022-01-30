using GlobitelSystem.Data;
using GlobitelSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GlobitelSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DepartmentController : ControllerBase
    {
        IDepartmentService departmentService;

        public DepartmentController(IDepartmentService _departmentService)
        {
            departmentService = _departmentService;
        }

        [HttpPost]
        public void Insert(Department department)
        {
            departmentService.Insert(department);
        }

        [HttpGet]
        public List<Department> GetAllDepartment()
        {
            return departmentService.GetAllDepartment();
        }
    }
}
