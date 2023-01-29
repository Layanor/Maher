

namespace main.Controllers
{
    public class evaluationController: BaseController<evaluationController>
    {
        public UserWithRoles CurentUser()
        {
            var userwithrole = _unitOfWork.GetLogedinuser();
            if (userwithrole == null)
            {
                throw new ApiException("الرجاء تسجيل الدخول", 401);
            }
            var currentRoles = userwithrole.Roles != null ? userwithrole.Roles.ToList() : new List<string>();
            if (!currentRoles.Contains("Muder"))
                throw new ApiException("لا تملك صلاحية", 403);

            return userwithrole;
        }

        [HttpPost()]
        // [ValidateAntiForgeryToken]
        public async Task<ActionResult<List<evaluation>>> Getdata()
        {
            var user = CurentUser();
            if (user.Id == null)
            {
                return BadRequest(new ApiError(_Logger, "الرجاء تسجيل الدخول"));
            }
            var data = await _unitOfWork.Repository<evaluation>().GetAllListAsync();

            return new OkObjectResult(new { result = data, count = data.Count() });

        }

        [HttpPost("Insert")]
        // [ValidateAntiForgeryToken]
        public async Task<ActionResult<evaluation>> Insert([FromBody] CRUDModel<evaluation> value)
        {
            var user = CurentUser();
            if (user.Id == null)
            {
                return BadRequest(new ApiError(_Logger, "الرجاء تسجيل الدخول"));
            }

            if (ModelState.IsValid)
            {
                if (value.Action == "insert")
                {
                    try
                    {
                        _unitOfWork.Repository<evaluation>().Add(value.Value);
                        var r = await _unitOfWork.Complete();
                        if (r <= 0)
                        {
                            return null;
                        }


                        return Created("", value.Value);
                    }
                    catch (Exception e)
                    {

                        return BadRequest(new ApiError(_Logger, "الرجاء التاكد من البيانات المرسلة" + e));
                    }


                }
                else
                {
                    return BadRequest(new ApiError(_Logger, "الرجاء التاكد من البيانات المرسلة"));
                }
            }
            return BadRequest(new ApiError(_Logger, ModelState));
        }

        [HttpPost("Update")]
        //  [ValidateAntiForgeryToken]
        public async Task<ActionResult> NormalUpdateAsync([FromBody] CRUDModel<evaluation> value)
        {
            if (ModelState.IsValid)
            {
                var id = Convert.ToInt32(value.Key);
                if (id == 0)
                {
                    return BadRequest(new ApiError(_Logger, "الرجاء التاكد من البيانات المرسلة"));
                }
                if (value.Action == "update")
                {
                    var data = await _unitOfWork.Repository<evaluation>().GetByIdAsync(id);
                    if (data == null)
                    {
                        return BadRequest(new ApiError(_Logger, "الرجاء التاكد من البيانات المرسلة"));
                    }
                    var louser = CurentUser();
                    if (louser.Id == null)
                    {
                        return BadRequest(new ApiError(_Logger, "الرجاء تسجيل الدخول"));
                    }

                    try
                    {
                        data.Name = value.Value.Name;
                        List<string> NoUpdateProperty = new List<string>();
                        _unitOfWork.Repository<evaluation>().Update(data, NoUpdateProperty);
                        var r = await _unitOfWork.Complete();
                        if (r <= 0)
                        {
                            return null;
                        }

                        return Ok(data);
                    }
                    catch (DbUpdateConcurrencyException e)
                    {
                        return BadRequest(new ApiError(_Logger, "الرجاء التاكد من البيانات المرسلة" + e));
                    }

                }
                return BadRequest(new ApiError(_Logger, "الرجاء التأكد من البيانات المدخلة"));
            }
            return BadRequest(new ApiError(_Logger, ModelState));
        }

        [HttpPost("Delete")]
        //   [ValidateAntiForgeryToken]
        public async Task<ActionResult> Delete([FromBody] CRUDModel<evaluation> value)
        {
            var id = Convert.ToInt32(value.Key);
            if (id == 0)
            {
                return BadRequest(new ApiError(_Logger, "الرجاء التاكد من البيانات المرسلة"));
            }
            if (value.Action == "remove")
            {
                var data = await _unitOfWork.Repository<evaluation>().GetByIdAsync(id);
                if (data == null)
                {
                    return BadRequest(new ApiError(_Logger, "الرجاء التاكد من البيانات المرسلة"));
                }
                var louser = CurentUser();
                if (louser.Id == null)
                {
                    return BadRequest(new ApiError(_Logger, "الرجاء تسجيل الدخول"));
                }
                try
                {

                    _unitOfWork.Repository<evaluation>().Delete(data);
                    var r = await _unitOfWork.Complete();
                    if (r <= 0)
                    {
                        return null;
                    }
                    return Accepted(data);

                }
                catch (DbUpdateConcurrencyException e)
                {
                    return BadRequest(new ApiError(_Logger, "الرجاء التاكد من البيانات المرسلة" + e));
                }

            }
            return BadRequest(new ApiError(_Logger, "الرجاء التاكد من البيانات المرسلة"));
        }



    }
}
