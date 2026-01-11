import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryRequest } from '../models/category.model';
import { CategoryService } from '../services/category-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  private router = inject(Router)
  constructor(){
    effect(()=>{
      if(this.categoryService.addCategoryStatus() === 'success'){
        //Redirect back to category list page
        this.categoryService.addCategoryStatus.set('idle');
        this.router.navigate(['/admin/categories']);
      }
      if(this.categoryService.addCategoryStatus() === 'error'){
        console.log('Add category Request Failed');
        //Redirect back to category list page
      }     
    });
  }
  private categoryService = inject(CategoryService)
  //1. Import ReactiveFormsModule
  //2. FormGroups -> FormControls
//addCategoryFormGroup is variable that holds the entire Form Model
//' ' it's blank cause we're not providing any default value
addCategoryFormGroup = new FormGroup({
    name : new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    urlHandle : new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
  });
// nameFormControl & urlHandleFormControl are created so that we can directly 
  //use it inside the  HTML file with  directive
  get nameFormControl(){
    return this.addCategoryFormGroup.controls.name;
  }
  get urlHandleFormControl(){
    return this.addCategoryFormGroup.controls.urlHandle;
  }

  onSubmit(){
    const addCategoryFormValue = this.addCategoryFormGroup.getRawValue();

    const AddCategoryRequestDto : AddCategoryRequest = {
      name : addCategoryFormValue.name,
      urlHandle : addCategoryFormValue.urlHandle,
    };

    this.categoryService.addCategory(AddCategoryRequestDto);

    
  }

  
}
