using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly IBlogPostRepository blogPostRepository;
        private readonly ICategoryRepository categoryRepository;

        public BlogPostsController(IBlogPostRepository blogPostRepository,
            ICategoryRepository categoryRepository)
        {
            this.blogPostRepository = blogPostRepository;
            this.categoryRepository = categoryRepository;
        }
        //POST: {apibaseurl}/api/BlogPosts
        [HttpPost]
        public async Task<IActionResult> CreateBlogPost([FromBody] CreateBlogPostRequestDto requestDto)
        {
            //convert DTO to domain model
            var blogPost = new BlogPost
            {
                Title = requestDto.Title,
                shortDescription = requestDto.shortDescription,
                Content = requestDto.Content,
                FeaturedImageUrl = requestDto.FeaturedImageUrl,
                UrlHandle = requestDto.UrlHandle,
                PublishedDate = requestDto.PublishedDate,
                Author = requestDto.Author,
                IsVisible = requestDto.IsVisible,
                Categories = new List<Category>()
            };

            foreach (var categoryGuid in requestDto.Categories)
            {
                var existingCategory = await categoryRepository.GetCategoryByIdAsync(categoryGuid);
                if (existingCategory != null)
                {
                    blogPost.Categories.Add(existingCategory);
                }
            }

            blogPost = await blogPostRepository.CreateAsync(blogPost);

            // Convert Domain Model back to DTO

            var response = new BlogPostDto
            {
                Id = blogPost.Id,
                Title = blogPost.Title,
                Content = blogPost.Content,
                Author = blogPost.Author,
                FeaturedImageUrl = blogPost.FeaturedImageUrl,
                IsVisible = blogPost.IsVisible,
                PublishedDate = blogPost.PublishedDate,
                shortDescription = blogPost.shortDescription,
                UrlHandle = blogPost.UrlHandle,
                Categories = blogPost.Categories.Select(category => new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle
                }).ToList()
            };
            return Ok(response);
        }

        //Get : {apibaseurl}/api/BlogPosts
        [HttpGet]
        public async Task<IActionResult> GetAllBlogPosts()
        {
            var blogPosts = await blogPostRepository.GetAllAsync();

            //convert Domain model to DTO
            var response = blogPosts.Select(blogPost => new BlogPostDto
            {
                Id = blogPost.Id,
                Title = blogPost.Title,
                Content = blogPost.Content,
                Author = blogPost.Author,
                FeaturedImageUrl = blogPost.FeaturedImageUrl,
                IsVisible = blogPost.IsVisible,
                PublishedDate = blogPost.PublishedDate,
                shortDescription = blogPost.shortDescription,
                UrlHandle = blogPost.UrlHandle,
                Categories = blogPost.Categories.Select(category => new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle
                }).ToList()
            }).ToList();

            return Ok(response);
        }

        //GET : {apibaseurl}/api/BlogPosts/{id}
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetBlogPostById([FromRoute] Guid id)
        {
            var blogPost = await blogPostRepository.GetByIdAsync(id);
            if (blogPost == null)
            {
                return NotFound();
            }
            //convert Domain model to DTO
            var response = new BlogPostDto
            {
                Id = blogPost.Id,
                Title = blogPost.Title,
                Content = blogPost.Content,
                Author = blogPost.Author,
                FeaturedImageUrl = blogPost.FeaturedImageUrl,
                IsVisible = blogPost.IsVisible,
                PublishedDate = blogPost.PublishedDate,
                shortDescription = blogPost.shortDescription,
                UrlHandle = blogPost.UrlHandle,
                Categories = blogPost.Categories.Select(category => new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle
                }).ToList()
            };
            return Ok(response);
        }

        //PUT : {apibaseurl}/api/BlogPosts/{id
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateBlogPostById([FromRoute] Guid id, UpdateBlogPostRequestDto requestDto)
        {
           //Convert DTO to Domain Model
            var blogPost = new BlogPost
            {
                Id = id,
                Title = requestDto.Title,
                shortDescription = requestDto.shortDescription,
                Content = requestDto.Content,
                FeaturedImageUrl = requestDto.FeaturedImageUrl,
                UrlHandle = requestDto.UrlHandle,
                PublishedDate = requestDto.PublishedDate,
                Author = requestDto.Author,
                IsVisible = requestDto.IsVisible,
                Categories = new List<Category>()
            };
            foreach (var categoryGuid in requestDto.Categories)
            {
                var existingCategory = await categoryRepository.GetCategoryByIdAsync(categoryGuid);
                if (existingCategory != null)
                {
                    blogPost.Categories.Add(existingCategory);
                }
            }
            //call repository to update blogpost domain model
            var updatedBlogPost = await blogPostRepository.UpdateAsync(id, blogPost);
            if (updatedBlogPost == null)
            {
                return NotFound();
            }
            //Convert Domain Model back to DTO
            var response = new BlogPostDto
            {
                Id = blogPost.Id,
                Title = blogPost.Title,
                Content = blogPost.Content,
                Author = blogPost.Author,
                FeaturedImageUrl = blogPost.FeaturedImageUrl,
                IsVisible = blogPost.IsVisible,
                PublishedDate = blogPost.PublishedDate,
                shortDescription = blogPost.shortDescription,
                UrlHandle = blogPost.UrlHandle,
                Categories = blogPost.Categories.Select(category => new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle
                }).ToList()
            };
            return Ok(response);
        }

        //Delete: {apibaseurl}/api/blogposts/{id}
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteBlogPost([FromRoute] Guid id)
        {
            var blogPost = await blogPostRepository.DeleteByIdAsync(id);
            if (blogPost == null)
            {
                return NotFound();
            }
            //Convert Domain Model to DTO
            var response = new BlogPostDto
            {
                Id = blogPost.Id,
                Title = blogPost.Title,
                Content = blogPost.Content,
                Author = blogPost.Author,
                FeaturedImageUrl = blogPost.FeaturedImageUrl,
                IsVisible = blogPost.IsVisible,
                PublishedDate = blogPost.PublishedDate,
                shortDescription = blogPost.shortDescription,
                UrlHandle = blogPost.UrlHandle,
                
            };
            return Ok(response);
        }


    }
}
