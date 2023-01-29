
namespace infra.Specification
{
    class SpecificationEvaluator<TEntity> where TEntity : class
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, Ispecification<TEntity> spec)
        {
            var query = inputQuery;
            if (spec.Criteria != null)
            {
                query = query.Where(spec.Criteria);
            }
            if (spec.Includes.Count > 0)
            {
                query = spec.Includes.
                              Aggregate(query, (current, include) => include(current));
            }
          
            if (spec.Select != null)
            {
                query = query.Select(spec.Select);
            }
            return query;
        }
    }
}
