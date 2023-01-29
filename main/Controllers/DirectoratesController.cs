namespace main.Controllers.infra
{
    [Authorize(Roles = "SuperMuder"
    )]

    public class DirectoratesController : BaseController<DirectoratesController>
    {
        private readonly ApplicationDbContextmariadb _context;

        public DirectoratesController(ApplicationDbContextmariadb context)
        {
            _context = context;
        }

        [HttpPost]
        public ActionResult<Directorate> GetDirectorates()
        {
            IEnumerable DataSource = _context.directorates.ToList();
            return Ok(DataSource);

        }


        [HttpPost("Insert")]
        public async Task<ActionResult<Directorate>> Insert([FromBody] CRUDModel<Directorate> value)
        {

            if (ModelState.IsValid)
            {
                if (value.Action == "insert")
                {
                    _context.directorates.Add(value.Value);
                    await _context.SaveChangesAsync();
                    return Ok(value.Value);
                }
                else
                {
                    return BadRequest("الرجاء التاكد من البيانات المرسلة");

                }
            }
            return BadRequest(new ApiError(_Logger, ModelState));
        }

        [HttpPost("Update")]
        // [ValidateAntiForgeryToken]
        public async Task<ActionResult> NormalUpdateAsync([FromBody] CRUDModel<Directorate> value)
        {
            if (ModelState.IsValid)
            {
                var id = Convert.ToInt32(value.Key);
                if (id == 0)
                {
                    return BadRequest("الرجاء التاكد من البيانات المرسلة");
                }
                if (value.Action == "update")
                {
                    var data = await _context.directorates.FindAsync(id).ConfigureAwait(false);
                    if (data == null)
                    {
                        return BadRequest("الرجاء التاكد من البيانات المرسلة");
                    }
                    _context.Entry(data).State = EntityState.Modified;

                    try
                    {
                        data.Name = value.Value.Name;
                        await _context.SaveChangesAsync();
                        return Ok(value.Value);
                    }
                    catch (DbUpdateConcurrencyException e)
                    {
                        return BadRequest("الرجاء التاكد من البيانات المرسلة" + e);

                    }

                }
                return BadRequest(new ApiError(_Logger, "الرجاء التأكد من البيانات المدخلة"));
            }
            return BadRequest(new ApiError(_Logger, ModelState));
        }

        [HttpPost("Delete")]
        //   [ValidateAntiForgeryToken]
        public async Task<ActionResult> Delete([FromBody] CRUDModel<Directorate> value)
        {
            var id = Convert.ToInt32(value.Key);
            if (id == 0)
            {
                return BadRequest("الرجاء التاكد من البيانات المرسلة");
            }
            if (value.Action == "remove")
            {
                var data = await _context.directorates.FindAsync(id).ConfigureAwait(false);
                if (data == null)
                {
                    return BadRequest("الرجاء التاكد من البيانات المرسلة");
                }

                var medicalcenter = _context.schools.Any(m => m.DirectorateId == id);
                if (medicalcenter)
                {
                    return BadRequest(new ApiError(_Logger, "الرجاء حذف كافة  المدارس التابعة للمنطقة قبل حذف المنطقة"));
                }
                try
                {
                    _context.directorates.Remove(data);
                    await _context.SaveChangesAsync();
                    return Ok(data);
                }
                catch (DbUpdateConcurrencyException e)
                {
                    return BadRequest(new ApiError(_Logger, e.ToString()));

                }

            }
            return BadRequest("الرجاء التاكد من البيانات المرسلة");
        }


        // Urladaptar

        /*  [HttpPost("UrlDatasource")]
         public IActionResult UrlDatasource([FromBody]DataManagerRequest dm)
         {
             IEnumerable DataSource = _context.Directorates.ToList();
             DataOperations operation = new DataOperations();
             DataSource = operation.Execute(DataSource, dm);
             int count = DataSource.Cast<Directorate>().Count();

             /*   if (dm.Search != null && dm.Search.Count > 0)
              {
                  // Searching
                  DataSource = operation.PerformSearching(DataSource, dm.Search);
              }
              if (dm.Sorted != null && dm.Sorted.Count > 0)
              {
                  // Sorting
                  DataSource = operation.PerformSorting(DataSource, dm.Sorted);
              }
              if (dm.Where != null && dm.Where.Count > 0)
              {
                  // Filtering
                  DataSource = operation.PerformFiltering(DataSource, dm.Where, dm.Where[0].Operator);
              }
                if (dm.Select != null)
              {
                  DataSource = operation.PerformSelect(DataSource, dm.Select);  // Selected the columns value based on the filter request
                  DataSource = DataSource.Cast<dynamic>().Distinct().AsEnumerable(); // Get the distinct values from the selected column
              }
              if (dm.Skip != 0)
              {
                  //Paging
                  DataSource = operation.PerformSkip(DataSource, dm.Skip);
              }
              if (dm.Take != 0)
              {
                  DataSource = operation.PerformTake(DataSource, dm.Take);
              }
           //   return dm.RequiresCounts ? new DataResult() { Result = DataSource, Count = count } : (object)DataSource;

             if (dm.RequiresCounts)
             {
                 return Ok(new { result = DataSource, count = count });
             }
             else
             {
                 return Ok(DataSource);
             }

         } */

        // Performs Insert operation
        // public override object Insert(DataManager dm, object value, string key)
        // {
        //     Orders.Insert(0, value as Order);
        //     return value;
        // }

        // // Performs Remove operation
        // public override object Remove(DataManager dm, object value, string keyField, string key)
        // {
        //     Orders.Remove(Orders.Where(or => or.OrderID == int.Parse(value.ToString())).FirstOrDefault());
        //     return value;
        // }

        // // Performs Update operation
        // public override object Update(DataManager dm, object value, string keyField, string key)
        // {
        //     var data = Orders.Where(or => or.OrderID == (value as Order).OrderID).FirstOrDefault();
        //     if (data != null)
        //     {
        //         data.OrderID = (value as Order).OrderID;
        //         data.CustomerID = (value as Order).CustomerID;
        //         data.Freight = (value as Order).Freight;
        //     }
        //     return value;
        // }     



    }
}
