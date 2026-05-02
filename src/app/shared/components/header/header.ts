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
  authSrv = inject(AuthService)
  userName: string = '';
  isUserLoggedIn: boolean = false;
  loggedInUserData: UserModel | null = null;

  constructor() {
    // const localData = localStorage.getItem(GlobalConstant.LOCAL_LOGIN_DATA_KEY);
    // if (localData !== null) {
    //   this.loggedInUserData = JSON.parse(localData);
    // }
    //OR
    // this.loggedInUserData = this.authSrv.getLoginData();
    //OR
    this.authSrv.user$.subscribe(user => {
      this.loggedInUserData = user;
    })
    console.log("HEADER loggedInUser: ", this.loggedInUserData);
  }

  navigateTo(path: string): void {
    if (path === 'login') {
      this.router.navigateByUrl('/login');
    } else if (path === 'register') {
      this.router.navigateByUrl('/register');
    }
  }

  logout(): void {
    this.loggedInUserData = null;
    this.authSrv.removeUserDetails();
    this.router.navigateByUrl('/login');
  }

}
