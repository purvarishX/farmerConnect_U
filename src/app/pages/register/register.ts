import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IState } from '../../core/models/interfaces/Role.model';
import { GlobalConstant } from '../../core/constant/Constant';
import { ILoginResponse, IRegisterResponse } from '../../core/models/interfaces/api-response';
import { UserService } from '../../core/services/user-service';
import { UserModel } from '../../core/models/classes/User.model';
import { AddressService } from '../../core/services/address-service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {

  http = inject(HttpClient);
  router = inject(Router);
  userService = inject(UserService);
  addressService = inject(AddressService);
  private fb = inject(FormBuilder);
  addressAPIheaders = {
    headers: {
      'X-CSCAPI-KEY': GlobalConstant.ADDRESS_HEADERS_KEY
    }
  }

  roleClicked: 'customer' | 'farmer' = 'customer';
  registerForm!: FormGroup;

  stateList = signal<IState[]>([])
  cityList = signal<{ id: string, cityName: string }[]>([]);

  ngOnInit() {
    this.initForm();
    this.getStatesCall();
  }

  private getStatesCall(): void {
    const payload = {
      headers: this.addressAPIheaders
    }
    this.addressService.getStates(payload).subscribe({
      next: (res: any) => {
        this.stateList.set(
          res.map((stateInfo: any) =>
          ({
            id: stateInfo.id,
            stateName: stateInfo.name,
            stateCode: stateInfo.iso2
          })
          )
        )
        console.log("STATE LIST", this.stateList())
      },
      error: (err: any) => {
        console.log('ERROR', err);
      }
    });
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      role: [this.roleClicked, Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      street: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  getCities(event: any) {
    const payload = {
      headers: this.addressAPIheaders,
      stateCode: event.target.value
    }
    this.addressService.getCities(payload).subscribe({
      next: (res: any) => {
        this.cityList.set(
          res.map((cityInfo: any) =>
          ({
            id: cityInfo.id,
            cityName: cityInfo.name,
          })
          )
        )
        console.log("CITY LIST: ", this.cityList());
      },
      error: (err: any) => {
        console.log("Error");
      }
    })
    // this.http.get(
    //   `https://api.countrystatecity.in/v1/countries/IN/states/${stateCode}/cities`, headers).subscribe({
    //     next: (res: any) => {
    //       this.cityList.set(
    //         res.map((cityInfo: any) =>
    //         ({
    //           id: cityInfo.id,
    //           cityName: cityInfo.name,
    //         })
    //         )
    //       )
    //       console.log("CITY LIST: ", this.cityList());
    //     },
    //     error: (err: any) => {
    //       console.log("Error");
    //     }
    //   })
  }

  selectRoleWarm(event: any) {
    if (event === 'farmer') {
      this.roleClicked = 'farmer';
    } else {
      this.roleClicked = 'customer';
    }
    this.registerForm.get('role')?.setValue(this.roleClicked);
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.value;
    const payload: UserModel = {
      userId: 0, //handled at BE, Adds the last user ID + 1
      name: formValue.name,
      email: formValue.email,
      password: formValue.confirmPassword,
      roleId: this.roleClicked === 'farmer' ? 2 : 3,
      phone: formValue.phone,
      address: `${formValue.street}, ${formValue.city}, ${formValue.state}, ${formValue.pincode}`,
      createdAt: new Date()
    };
    this.userService.registerUserCall(payload).subscribe({
      next: (result: IRegisterResponse) => {
        alert('User Registeration Successful!')
        this.router.navigateByUrl('/login');
      },
      error: (error: any) => {
        alert("Register API Failed!")
      }
    })
  }

  goToLoginPage(): void {
    this.router.navigateByUrl('/login');
  }
}
