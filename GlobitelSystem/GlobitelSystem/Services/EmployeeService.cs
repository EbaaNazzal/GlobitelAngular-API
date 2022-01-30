using GlobitelSystem.Data;
using GlobitelSystem.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GlobitelSystem.Services
{
    public class EmployeeService: IEmployeeService
    {
        GlobitelContext context;
        public EmployeeService(GlobitelContext _context)
        {
            context = _context;
        }

        public List<Employee> GetAllEmployee()
        {
            List<Employee> liEmployee = context.Employees.Include("department").ToList();
            return liEmployee;
        }

        public Employee GetEmployeeById(int id)
        {
            Employee employee = context.Employees.Find(id);
            return employee;
        }

        public void Insert(Employee employee)
        {
            context.Employees.Add(employee);
            context.SaveChanges();
        }

        public void Delete(int id)
        {
            Employee employee = context.Employees.Find(id);
            context.Employees.Remove(employee);
            context.SaveChanges();
        }

        public void Update(Employee employee)
        {
            context.Employees.Attach(employee);
            context.Entry(employee).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            context.SaveChanges();
        }

        public List<ActiveEmployee> GetActiveEmployees()
        {
            List<ActiveEmployee> liActive = context.Employees.Where(e => e.Status == "Active").Include("department").Select(a => new ActiveEmployee(){ FirstName=a.FirstName, LastName=a.LastName, Phone=a.Phone , Email=a.Email , Gender=a.Gender, DateOfBirth=a.DateOfBirth, DateOfJoining=a.DateOfJoining , DepartmentName=a.department.Name}).ToList();
            return liActive;
        }
    }
}
