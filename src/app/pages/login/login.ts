import { Component } from '@angular/core';
import { UserLogin } from './../../core/models/classes/User.model';
import { UserService } from './../../core/services/user-service';
import { inject } from '@angular/core';
import { getSumOfTwo } from './../../core/helper/Utility';
import { Roles } from '../../core/enums/Roles.enum';
import { CommonImports } from '../../core/constant/CommonImports';
import { ILoginResponse } from '../../core/models/interfaces/api-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonImports.FORM_IMPORTS],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  loggedInUser: UserLogin = new UserLogin();

  userService = inject(UserService);

  router = inject(Router);

  constructor() {
    const getSum = getSumOfTwo(3, 40);
    //function not dependent on any outside state, pure function should be moved to a Utility file
  }

  onLogin() {
    this.userService.loginCall(this.loggedInUser).subscribe({
      next: (result: ILoginResponse) => {
        localStorage.setItem('loginData', JSON.stringify(result.data));
        this.router.navigateByUrl('home');
      },
      error: (error: any) => {
        alert ("Login API Failure!")
      }
    })
  }
}
