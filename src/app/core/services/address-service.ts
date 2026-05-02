import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GlobalConstant } from '../constant/Constant';

@Injectable({
  providedIn: 'root',
})
export class AddressService {

  http = inject(HttpClient);
  addressApiUrl = environment.STATE_CITY_API_URL;

  getStates(payload: any): Observable<any> {
    return this.http.get(`${this.addressApiUrl}`, payload.headers)
  }

  getCities(payload: any): Observable<any> {
    return this.http.get(`${this.addressApiUrl}/${payload.stateCode}/${GlobalConstant.API_ENDPOINTS.CITIES}`, payload.headers)
  }
}
