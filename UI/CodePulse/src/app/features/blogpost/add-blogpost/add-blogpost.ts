import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-blogpost',
  imports: [ReactiveFormsModule],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.css',
})
export class AddBlogpost {
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
    console.log(formRawValue);
  }
}
