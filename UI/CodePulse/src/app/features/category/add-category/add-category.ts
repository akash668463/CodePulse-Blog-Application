import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
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
    console.log(this.addCategoryFormGroup.getRawValue())
  }
}
