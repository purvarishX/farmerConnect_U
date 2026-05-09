import { inject, Injectable } from '@angular/core';
import { IApiResponseModel } from '../models/interfaces/api-response';
import { GlobalConstant } from '../constant/Constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category, Role } from '../models/classes/Role.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {

  http = inject(HttpClient);
  apiUrl = environment.API_URL;

  getAllRole(): Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(`${this.apiUrl}${GlobalConstant.API_ENDPOINTS.GET_ALL_ROLES}`)
  }

  createRole(roleObj: Role): Observable<IApiResponseModel> {
    return this.http.post<IApiResponseModel>(`${this.apiUrl}${GlobalConstant.API_ENDPOINTS.CREATE_ROLE}`, roleObj)
  }

  getAllCategory() {
    return this.http.get<IApiResponseModel>(`${this.apiUrl}${GlobalConstant.API_ENDPOINTS.GET_ALL_CATEGORIES}`)
  }

  createCategory(categoryObj: Category) {
    return this.http.post<IApiResponseModel>(`${this.apiUrl}${GlobalConstant.API_ENDPOINTS.CREATE_CATEGORY}`, categoryObj)
  }

}
