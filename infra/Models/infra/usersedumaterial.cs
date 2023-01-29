using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace infra.Models.infra
{
    public class usersedumaterial
    {
        public string ApplicationUserId { get; set; } =default!;
        public ApplicationUser ApplicationUser { get; set; } =default!;
        public int edumaterialsId { get; set; }
        public edumaterial edumaterials { get; set; } =default!;
    }
}
