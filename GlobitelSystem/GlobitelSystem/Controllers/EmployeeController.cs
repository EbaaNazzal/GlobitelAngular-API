using ClosedXML.Excel;
using GlobitelSystem.Data;
using GlobitelSystem.DTO;
using GlobitelSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GlobitelSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   [Authorize]
    public class EmployeeController : ControllerBase
    {
        IDepartmentService departmentService;
        IEmployeeService employeeService;

        public EmployeeController(IDepartmentService _departmentService, IEmployeeService _employeeService)
        {
            departmentService = _departmentService;
            employeeService = _employeeService;
        }

        [HttpPost]
        public void Create(Employee employee)
        {
            employeeService.Insert(employee);
        }

        [HttpGet]
        [Route("GetAllDepartment")]
        public List<Department> GetAllDepartment()
        {
            return departmentService.GetAllDepartment(); 
        }

        [HttpGet]
        [Route("GetAllEmployee")]
        public List<Employee> GetAllEmployee()
        {
            return employeeService.GetAllEmployee();
        }

        [HttpGet]
        [Route("Delete/{id}")]
        public void Delete(int id)
        {
            employeeService.Delete(id);
        }

        [HttpGet]
        [Route("GetEmployeeById/{id}")]
        public Employee GetEmployeeById(int id)
        {
            return employeeService.GetEmployeeById(id);
        }

        [HttpPost]
        [Route("Update")]
        public void Update(Employee employee)
        {
            employeeService.Update(employee);
        }

        [HttpPost]
        [Route("upload")]
        public void UploadImg() {
            IFormFile file = HttpContext.Request.Form.Files[0];
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), @"Images", file.FileName);
            file.CopyTo(new FileStream(filePath, FileMode.Create));
        }

        [HttpGet]
        [Route("GetActiveEmployees")]
        public List<ActiveEmployee> GetActiveEmployees()
        {    
            return employeeService.GetActiveEmployees(); ;
        }
    }
}
