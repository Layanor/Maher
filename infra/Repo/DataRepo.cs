
namespace infra.Repo
{
    public class DataRepo<T> : IDataRepo<T> where T : BaseModel
    {
        private DbSet<T> entities;
        string errorMessage = string.Empty;
        //   private readonly ILogger<IDataRepo<T>> _logger;
        //   private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContextmariadb _context;
        public DataRepo(
            //  UserManager<ApplicationUser> userManager,
            ApplicationDbContextmariadb context
             //    ILogger<IDataRepo<T>> logger
             )
        {
            //   _userManager = userManager;
            //  _logger = logger;
            _context = context;
            entities = _context.Set<T>();
        }


        public async Task<List<T>> GetAllListAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }
        public async Task<IEnumerable<T>> GetAllIenumerable()
        {
            return await _context.Set<T>().ToArrayAsync();
        }
        public async Task<List<T>> GetAllListWithSpecAsync(Ispecification<T> spec, int take, int skip)
        {
            if (take == 0 && skip == 0)
            {
                return await ApplySpecification(spec).ToListAsync();
            }
            else
            {
                return await ApplySpecification(spec).Take(take).Skip(skip).ToListAsync();
            }

        }
        public IQueryable<T> GetAllWithSpec(Ispecification<T> spec, int take, int skip)
        {
            if (take == 0 && skip == 0)
            {
                return ApplySpecification(spec);
            }
            else
            {
                return ApplySpecification(spec).Take(take).Skip(skip);
            }

        }
        //
        public async Task<T> GetByIdAsync(int id)
        {
            return await entities.SingleOrDefaultAsync(i => i.Id == id);
        }
        public async Task<List<T>> GetBylistidAsync(List<int> ids)
        {
            return await entities.Where(i => ids.Contains(i.Id)).ToListAsync();
        }
        public async Task<T> GetByIdWithSpecAsync(Ispecification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }
        //
        private IQueryable<T> ApplySpecification(Ispecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(entities.AsQueryable(), spec);
        }

        //
        // public async Task<T> AddAsync(T entity)
        // {
        //     if (entity == null) throw new ArgumentNullException("entity");

        //     await   entities.AddAsync(entity);
        // }

        public void Add(T entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException("entity");
                }
                entities.Add(entity);
            }
            catch (Exception dbEx)
            {

                // foreach (var validationErrors in dbEx.EntityValidationErrors)
                // {
                //     foreach (var validationError in validationErrors.ValidationErrors)
                //     {
                //         errorMessage += string.Format("Property: {0} Error: {1}",
                //         validationError.PropertyName, validationError.ErrorMessage) + Environment.NewLine;
                //     }
                // }
                throw new Exception(dbEx.Message, dbEx);
            }



        }


        public void AddRange(List<T> entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException("entity");
                }
                entities.AddRange(entity);
            }
            catch (Exception dbEx)
            {

                // foreach (var validationErrors in dbEx.EntityValidationErrors)
                // {
                //     foreach (var validationError in validationErrors.ValidationErrors)
                //     {
                //         errorMessage += string.Format("Property: {0} Error: {1}",
                //         validationError.PropertyName, validationError.ErrorMessage) + Environment.NewLine;
                //     }
                // }
                throw new Exception(dbEx.Message, dbEx);
            }
        }

        // public async Task<T> PutByIdAsync(int id)
        // {
        //     return await entities.FindAsync(id);
        // }

        // public async Task<T> UpdatByIdAsync(int id)
        // {
        //     return await entities.FindAsync(id);
        // }
        public void Update(T entity, List<String> NoUpdateProperty)
        {
            if (entity == null) throw new ArgumentNullException("entity");
            try
            {
                if (entity != null)
                {
                    entities.Attach(entity);
                    _context.Entry(entity).State = EntityState.Modified;
                    if (NoUpdateProperty.Count > 0)
                    {
                        foreach (string item in NoUpdateProperty)
                        {
                            _context.Entry<T>(entity).Property(item).IsModified = false;
                        }
                    }
                }
            }
            catch (Exception dbEx)
            {

                throw new Exception(dbEx.Message, dbEx); ;
            }

        }

        // public async Task<T> DeletByIdAsync(int id)
        // {
        //     return await entities.FindAsync(id);
        // }
        public void Delete(T entity)
        {
            try
            {
                if (entity != null)
                {
                    entities.Remove(entity);
                }
            }
            catch (Exception dbEx)
            {

                throw new Exception(dbEx.Message, dbEx); ;
            }

        }

        public void DeleteRange(List<T> entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException("entity");
                }
                entities.RemoveRange(entity);
            }
            catch (Exception dbEx)
            {

                // foreach (var validationErrors in dbEx.EntityValidationErrors)
                // {
                //     foreach (var validationError in validationErrors.ValidationErrors)
                //     {
                //         errorMessage += string.Format("Property: {0} Error: {1}",
                //         validationError.PropertyName, validationError.ErrorMessage) + Environment.NewLine;
                //     }
                // }
                throw new Exception(dbEx.Message, dbEx);
            }
        }
        public void DeleteByid(int id)
        {
            if (id == 0) throw new ArgumentNullException("entity");

            T entity = entities.SingleOrDefault(s => s.Id == id);
            if (entity != null)
            {
                entities.Remove(entity);
            }

        }
        public IEnumerable<T> Filter(Func<T, bool> predicate)
        {
            return _context.Set<T>().Where(predicate);
        }

        public void SaveChanges() => _context.SaveChanges();


        //public TResult GetFirstOrDefault<TResult>(Expression<Func<T, TResult>> selector,
        //                                  Expression<Func<T, bool>> predicate = null,
        //                                  Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        //                                  Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
        //                                  bool disableTracking = true)
        //{
        //    IQueryable<T> query = _dbSet;
        //    if (disableTracking)
        //    {
        //        query = query.AsNoTracking();
        //    }

        //    if (include != null)
        //    {
        //        query = include(query);
        //    }

        //    if (predicate != null)
        //    {
        //        query = query.Where(predicate);
        //    }

        //    if (orderBy != null)
        //    {
        //        return orderBy(query).Select(selector).FirstOrDefault();
        //    }
        //    else
        //    {
        //        return query.Select(selector).FirstOrDefault();
        //    }
        //}





    }
}
