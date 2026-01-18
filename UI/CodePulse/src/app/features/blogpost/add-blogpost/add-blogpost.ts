import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogPostService } from '../services/blog-post-service';
import { Router } from '@angular/router';
import { AddBlogPostRequest } from '../models/blogpost.model';


@Component({
  selector: 'app-add-blogpost',
  imports: [ReactiveFormsModule],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.css',
})
export class AddBlogpost {
  blogPostService = inject(BlogPostService); 
  router = inject(Router);

  addBlogPostForm = new FormGroup({
    title : new FormControl<string>('', {
      nonNullable : true,
      validators : [Validators.required, Validators.minLength(10), Validators.maxLength(100)]
    }),
    shortDescription : new FormControl<string>('', {
      nonNullable : true,
      validators : [Validators.required, Validators.minLength(10), Validators.maxLength(100)]
    }),
    content : new FormControl<string>('', {
      nonNullable : true,
      validators : [Validators.required, Validators.minLength(10)]
    }),
    featuredImageUrl : new FormControl<string>('', {
      nonNullable : true,
      validators : [Validators.required, Validators.maxLength(200)]
    }),
    urlHandle : new FormControl<string>('', {
      nonNullable : true,
      validators : [Validators.required, Validators.maxLength(10)]
    }),
    publishedDate : new FormControl<string>(new Date().toISOString().split('T')[0], {
      nonNullable : true,
      validators : [Validators.required]
    }),
    author : new FormControl<string>('', {
      nonNullable : true,
      validators : [Validators.required, Validators.maxLength(100)]
    }),
    isVisible : new FormControl<boolean>(false, {
      nonNullable : true,
    })

  })

  onSubmit(){
    const formRawValue = this.addBlogPostForm.getRawValue();
    
    const requestDto : AddBlogPostRequest = {
      title: formRawValue.title,
      shortDescription : formRawValue.shortDescription,
      content : formRawValue.content,
      author : formRawValue.author,
      featuredImageUrl : formRawValue.featuredImageUrl,
      isVisible : formRawValue.isVisible,
      urlHandle : formRawValue.urlHandle,
      publishedDate : new Date(formRawValue.publishedDate)
    };

    this.blogPostService.createBlogPost(requestDto).subscribe({
      next : (response) => {
        console.log(response);

        //navigate to the blog post list page
        this.router.navigate(['/admin/blogposts']);
      },
      error: () => {
        console.error('Something went wrong');
      },
    });
  }
}
