import { Component, effect, inject, input } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  id = input<string>();
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
    console.log(this.editCategoryFormGroup.getRawValue());
  }
}
