import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLogin } from '../models/classes/User.model';
import { environment } from '../../../environments/environment';
import { GlobalConstant } from '../constant/constant';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  http = inject(HttpClient);
  apiUrl = environment.API_URL;

  loginCall(obj: UserLogin) {
    return this.http.post(`${this.apiUrl}${GlobalConstant.API_ENDPOINTS.LOGIN}`, obj)
  }
}
