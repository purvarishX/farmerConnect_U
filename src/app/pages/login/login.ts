import { Component } from '@angular/core';
import { UserLogin } from './../../core/models/classes/User.model';
import { UserService } from './../../core/services/user-service';
import { inject } from '@angular/core';
import { getSumOfTwo } from './../../core/helper/Utility';
import { Roles } from '../../core/enums/Roles.enum';
import { CommonImports } from '../../core/constant/CommonImports';

@Component({
  selector: 'app-login',
  imports: [CommonImports.FORM_IMPORTS],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  loginUserObj: UserLogin = {
    username: '',
    password: '',
    role: 0
  }

  userService = inject(UserService)

  constructor() {
    const getSum = getSumOfTwo(3, 40);
    //function not dependent on any outside state, pure function should be moved to a Utility file
  }

  onLogin() {
    this.loginUserObj.role = Roles.Customer;
    this.userService.loginCall(this.loginUserObj).subscribe({
    })
  }
}
