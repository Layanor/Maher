
namespace infra.Specification
{
    public static class QuerySpecificationExtensions
    {
        public static IQueryable<T> Specify<T>(this IQueryable<T> query, Ispecification<T> spec) where T : class
        {
  
            var queryableResultWithIncludes = spec.Includes
            .Aggregate(query,
                (current, include) => include(current));

            return queryableResultWithIncludes.Where(spec.Criteria);

        }
    }
}
