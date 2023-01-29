

namespace infra.Repo
{
    public interface IDataRepo<T> where T : BaseModel
    {
        Task<List<T>> GetAllListAsync();
        Task<IEnumerable<T>> GetAllIenumerable();

        Task<List<T>> GetAllListWithSpecAsync(Ispecification<T> spec, int take, int skip);
        IQueryable<T> GetAllWithSpec(Ispecification<T> spec, int take, int skip);

        //
        Task<T> GetByIdAsync(int id);
        Task<List<T>> GetBylistidAsync(List<int> ids);
        Task<T> GetByIdWithSpecAsync(Ispecification<T> spec);
        //
        //   Task<T> AddAsync();

        // Task<T> UpdatByIdAsync(int id);
        // Task<T> PutByIdAsync(int id);
        // Task<T> DeletByIdAsync(int id);

        void Add(T entity);
        void AddRange(List<T> entity);
        void DeleteRange(List<T> entity);

        void Update(T entity, List<String> NoUpdateProperty);
        void Delete(T entity);
        void DeleteByid(int id);
        IEnumerable<T> Filter(Func<T, bool> predicate);

        //separate method SaveChanges can be helpful when using this pattern with UnitOfWork
        void SaveChanges();

        //  Task GetFirstOrDefaultAsync(Func<object, bool> predicate, Func<object, object> include);
    }
}
