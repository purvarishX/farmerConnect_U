import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLogin, UserModel } from '../models/classes/User.model';
import { environment } from '../../../environments/environment';
import { GlobalConstant } from '../constant/Constant';
import { Observable } from 'rxjs';
import { ILoginResponse, IRegisterResponse } from '../models/interfaces/api-response';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  http = inject(HttpClient);
  apiUrl = environment.API_URL;

  loginCall(payload: UserLogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.apiUrl}${GlobalConstant.API_ENDPOINTS.LOGIN}`, payload)
  }

  registerUserCall(payload: UserModel): Observable<IRegisterResponse> {
    return this.http.post<ILoginResponse>(`${this.apiUrl}${GlobalConstant.API_ENDPOINTS.REGISTER}`, payload)
  }
}
