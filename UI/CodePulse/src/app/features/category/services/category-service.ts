import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AddCategoryRequest, Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiBaseUrl = 'https://localhost:7213';

  addCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');

  addCategory(category: AddCategoryRequest){
    this.addCategoryStatus.set('loading');
    this.http.post<void>(`${this.apiBaseUrl}/api/categories`, category).subscribe({
      next: () => {
        this.addCategoryStatus.set('success');
      },
      error: () => {
        this.addCategoryStatus.set('error');
      },
    });
  }
  getAllCategories(){
    return httpResource<Category[]>(()=>`${this.apiBaseUrl}/api/categories`);
  }
}

