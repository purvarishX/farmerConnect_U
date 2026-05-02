import { Injectable } from '@angular/core';
import { GlobalConstant } from '../constant/Constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  getLoginData() {
    const localData = localStorage.getItem(GlobalConstant.LOCAL_LOGIN_DATA_KEY);
    if (localData !== null) {
       return JSON.parse(localData);
    }
  }

  
}
