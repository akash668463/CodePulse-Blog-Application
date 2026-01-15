namespace CodePulse.API.Models.DTO
{
    public class UpdateCategoryRequestDto
    {
        // No Id property because we don't need to edit it
        public string Name { get; set; }
        public string UrlHandle { get; set; }
    }
}
