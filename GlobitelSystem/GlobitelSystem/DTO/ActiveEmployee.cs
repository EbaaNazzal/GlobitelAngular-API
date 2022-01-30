using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GlobitelSystem.DTO
{
    public class ActiveEmployee
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime DateOfJoining { get; set; }
        public string DepartmentName { get; set; }
    }
}
