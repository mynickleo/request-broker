namespace RequestBroker.Models
{
    public class PaginatedResponse<T>
    {
        public List<T> Data { get; set; }
        public int Total { get; set; }

        public PaginatedResponse(List<T> data, int total)
        {
            Data = data;
            Total = total;
        }
    }
}
