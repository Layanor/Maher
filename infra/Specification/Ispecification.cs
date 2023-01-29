

namespace infra.Specafication
{
    public interface Ispecification<T>
    {
        Expression<Func<T, bool>> Criteria { get; }
        Expression<Func<T, T>> Select { get; }
        List<Func<IQueryable<T>, IIncludableQueryable<T, object>>> Includes { get; }
    }
}
