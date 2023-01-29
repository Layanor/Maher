//
// Summary:
//     Used to model bind the values while performing CRUD operation using DataManager.
//
// Type parameters:
//   T:
//     The element type used by the record from the request body
namespace infra.Models.infra
{
    public class CRUDModel2<T> where T : class
    {

        //
        // Summary:
        //     Specifies the action initiated the request.
        public string Action { get; set; } =default!;
        //
        // Summary:
        //     Specifies the Table name(if any) to be updated.
        public string Table { get; set; } =default!;
        //
        // Summary:
        //     Specifies the Primary key column name.
        public string KeyColumn { get; set; } =default!;
        //
        // Summary:
        //     Specifies the Primary key value.
        public object Key { get; set; } =default!;
        //
        // Summary:
        //     Specifies the modified/added record.
        public T Value { get; set; } =default!;
        //
        // Summary:
        //     Specifies the List<> added records while batch editing.
        //
        // Remarks:
        //     The Added property will holds values on batch editing only
        public List<T> Added { get; set; } =default!;
        //
        // Summary:
        //     Specifies the List<> updated records while batch editing.
        //
        // Remarks:
        //     The Changed property will holds values on batch editing only
        public List<T> Changed { get; set; } =default!;
        //
        // Summary:
        //     Specifies the List<> deleted records while batch editing.
        //
        // Remarks:
        //     The Deleted property will holds values on batch editing only
        public List<T> Deleted { get; set; } =default!;
        //
        // Summary:
        //     Holds the additional parameters passed.
        public IDictionary<string, object> Params { get; set; } =default!;
    }
}
