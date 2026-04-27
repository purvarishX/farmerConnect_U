import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLogin } from '../models/classes/User.model';
import { environment } from '../../../environments/environment';
import { GlobalConstant } from '../constant/Constant';
import { Observable } from 'rxjs';
import { ILoginResponse } from '../models/interfaces/api-response';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  http = inject(HttpClient);
  apiUrl = environment.API_URL;

  loginCall(obj: UserLogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.apiUrl}${GlobalConstant.API_ENDPOINTS.LOGIN}`, obj)
  }
}
