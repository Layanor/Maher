

namespace infra.Repo
{
    public interface IUnitOfWork : IDisposable
    {
        IEnumerable<T> LoadDataListWithParameters<T>(string sql, DynamicParameters parameters = null);


        T LoadDataSingleWithParameters<T>(string sql, DynamicParameters parameters = null);


        UserWithRoles GetLogedinuser();
        IDataRepo<T> Repository<T>() where T : BaseModel;
        Task<int> Complete();

        bool HasChanges();
    }
}
