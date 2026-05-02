import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GlobalConstant } from '../../../core/constant/Constant';
import { UserModel } from '../../../core/models/classes/User.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth-service'

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  router = inject(Router);
  authSrv = inject (AuthService)
  userName: string = '';
  isUserLoggedIn: boolean = false;
  loggedInUserData: UserModel = new UserModel();

  constructor() {
    // const localData = localStorage.getItem(GlobalConstant.LOCAL_LOGIN_DATA_KEY);
    // if (localData !== null) {
    //   this.loggedInUserData = JSON.parse(localData);
    // }

    this.loggedInUserData = this.authSrv.getLoginData();
    console.log("HEADER loggedInUser: ", this.loggedInUserData);
  }

  navigateTo(path: string): void {
    if (path === 'login') {
      this.router.navigateByUrl('/login');
    } else if (path === 'register') {
      this.router.navigateByUrl('/register');
    }
  }

  logout() {
    this.loggedInUserData = new UserModel();
    localStorage.removeItem(GlobalConstant.LOCAL_LOGIN_DATA_KEY);
    this.router.navigateByUrl('/login');
  }

}
