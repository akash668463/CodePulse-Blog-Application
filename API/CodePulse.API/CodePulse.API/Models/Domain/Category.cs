namespace CodePulse.API.Models.Domain
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string UrlHandle { get; set; }

        //for many to many relation - this means a single category can've collection of blogpost
        public ICollection<BlogPost> BlogPosts { get; set; }
    }
}
