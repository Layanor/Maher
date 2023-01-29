using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace infra.Models.infra
{
   public class UsersSchool
    {
        public string ApplicationUserId { get; set; } =default!;
        public ApplicationUser ApplicationUser { get; set; } =default!;
        public int SchoolId { get; set; }
        public School School { get; set; } =default!;
    }
}