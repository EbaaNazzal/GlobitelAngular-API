using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GlobitelSystem.Data
{
    public class Employee
    {
        public int Id { set; get; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [RegularExpression(@"07(7|8|9)\d{7}", ErrorMessage = "For Example 07*1234567 ")]
        public string Phone { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [Required(ErrorMessage = "SelectValidate")]
        public string Gender { get; set; }
        //[HireDateValidation]
        public DateTime DateOfBirth { get; set; }
        //[HireDateValidation]
        public DateTime DateOfJoining { get; set; }
        public string PhotoPath { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        [ForeignKey("department")]
        public int DepartmentId { get; set; }
        public Department department { get; set; }
    }
}
