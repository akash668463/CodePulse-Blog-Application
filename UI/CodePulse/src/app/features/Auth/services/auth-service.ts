import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/auth.model';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  login(email: string, password: string) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`,{
      email: email,
      password: password
    },{
      withCredentials: true
    });
    
  }
}
