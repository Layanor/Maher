

namespace infra.Specification
{
    public class BaseSpecification<T> : Ispecification<T>
    {
        public BaseSpecification()
        {
        }
        public Expression<Func<T, bool>> Criteria { get; set; } =default!;
        public BaseSpecification(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;

        }
        public Expression<Func<T, T>> Select { get; set; } =default!;

        public BaseSpecification(Expression<Func<T, bool>> criteria, Expression<Func<T, T>> select)
        {
            Criteria = criteria;
            Select = select;

        }
        public List<Func<IQueryable<T>, IIncludableQueryable<T, object>>> Includes { get; } = new List<Func<IQueryable<T>, IIncludableQueryable<T, object>>>();

        protected void AddInclude(Func<IQueryable<T>, IIncludableQueryable<T, object>> includeexpression)
        {
            Includes.Add(includeexpression);
        }
    }
}
