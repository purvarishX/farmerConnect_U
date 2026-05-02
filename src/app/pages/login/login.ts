import { Component } from '@angular/core';
import { UserLogin } from './../../core/models/classes/User.model';
import { UserService } from './../../core/services/user-service';
import { inject } from '@angular/core';
import { Roles } from '../../core/enums/Roles.enum';
import { CommonImports } from '../../core/constant/CommonImports';
import { ILoginResponse } from '../../core/models/interfaces/api-response';
import { Router, RouterModule } from '@angular/router';
import { GlobalConstant } from '../../core/constant/Constant';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonImports.FORM_IMPORTS, RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  loggedInUser: UserLogin = new UserLogin();

  userService = inject(UserService);
  router = inject(Router);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor() {
    //function not dependent on any outside state, pure function should be moved to a Utility file
    this.loggedInUser = new UserLogin();
  }

  onLogin(): void {
    //Object to Form
    // this.loginForm.setValue({
    //   email: this.loggedInUser.email,
    //   password: this.loggedInUser.password
    // });

    // this.loggedInUser = this.loginForm.value as UserLogin;
    //OR
    // this.loggedInUser = this.loginForm.getRawValue() as UserLogin;
    //OR
    this.loggedInUser.email = this.loginForm.value.email || '';
    this.loggedInUser.password = this.loginForm.value.password || '';

    this.userService.loginCall(this.loggedInUser).subscribe({
      next: (result: ILoginResponse) => {
        localStorage.setItem(GlobalConstant.LOCAL_LOGIN_DATA_KEY, JSON.stringify(result.data));
        this.router.navigateByUrl('/home');
      },
      error: (error: any) => {
        alert("Login API Failure!")
      }
    })
  }

  goToRegisterPage(): void {
    this.router.navigateByUrl('/register');
  }
}
