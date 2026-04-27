import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstant } from '../../../core/constant/Constant';
import { UserModel } from '../../../core/models/classes/User.model';
import { ILoginResponse } from '../../../core/models/interfaces/api-response';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  router = inject(Router);
  userName: string = '';
  isUserLoggedIn: boolean = false;
  loggedInUserData: UserModel = new UserModel();

  constructor() {
    const localData = localStorage.getItem(GlobalConstant.LOCAL_LOGIN_DATA_KEY);
    if (localData !== null) {
      this.loggedInUserData = JSON.parse(localData);
    }
  }

  navigateTo(path: string): void {
    if (path === 'login') {
      this.router.navigateByUrl('login');
    } else if (path === 'register') {
      this.router.navigateByUrl('register');
    }
  }

  logout() {
    this.router.navigateByUrl('login');
    this.loggedInUserData = new UserModel();
  }

}
