import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryRequest } from '../models/category.model';
import { CategoryService } from '../services/category-service';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  constructor(){
    effect(()=>{
      if(this.categoryService.addCategoryStatus() === 'success'){
        console.log('Success');
        //Redirect back to category list page
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
