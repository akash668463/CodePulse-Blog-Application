import { Component, effect, inject, input } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { updateCategoryRequest } from '../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  constructor(){
    effect(()=>{
      if(this.categoryService.updateCategoryStatus()==='success'){
        this.categoryService.updateCategoryStatus.set('idle');
        this.router.navigate(['/admin/categories']);
      }
      if(this.categoryService.updateCategoryStatus()==='error'){
        this.categoryService.updateCategoryStatus.set('idle');
        console.error('something went wrong!');
      }
    });
  }
  id = input<string>();
  private router = inject(Router)
  private categoryService = inject(CategoryService);

  categoryResourceRef = this.categoryService.getCategoriesById(this.id);
  categoryResponse = this.categoryResourceRef.value;

  editCategoryFormGroup = new FormGroup({
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
    return this.editCategoryFormGroup.controls.name;
  }
  get urlHandleFormControl(){
    return this.editCategoryFormGroup.controls.urlHandle;
  }
  //Initially the value of the form is empty because it's empty string but once we get the response back
  //from the API then their values will be patch inside the form. that's why we are using signals because 
  //they react to the changes that we have
  effectRef = effect(()=>{
    this.editCategoryFormGroup.controls.name.patchValue(this.categoryResponse()?.name??'');
    this.editCategoryFormGroup.controls.urlHandle.patchValue(this.categoryResponse()?.urlHandle??'');
  })

  onSubmit(){
    const id = this.id();
    if(!this.editCategoryFormGroup.valid || !id){
      return;
    }
    const formRawValue = this.editCategoryFormGroup.getRawValue();

    const updateCategoryRequestDto : updateCategoryRequest = {
      name: formRawValue.name,
      urlHandle:formRawValue.urlHandle,
    };
    this.categoryService.updateCategory(id,updateCategoryRequestDto);
  }
}
