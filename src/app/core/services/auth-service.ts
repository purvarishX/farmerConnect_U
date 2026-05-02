import { Injectable } from '@angular/core';
import { GlobalConstant } from '../constant/Constant';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLogin, UserModel } from '../models/classes/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userSubject = new BehaviorSubject<UserModel | null>(null);
  user$ = this.userSubject.asObservable();

  getLoginData() {
    const localData = localStorage.getItem(GlobalConstant.LOCAL_LOGIN_DATA_KEY);
    if (localData !== null) {
      return JSON.parse(localData);
    }
  }

  setUserDetails(userDetails: UserModel) {
    localStorage.setItem(GlobalConstant.LOCAL_LOGIN_DATA_KEY, JSON.stringify(userDetails));
    this.userSubject.next(userDetails);
  }

  removeUserDetails() {
    localStorage.removeItem(GlobalConstant.LOCAL_LOGIN_DATA_KEY);
    this.userSubject.next(null);
  }

}
