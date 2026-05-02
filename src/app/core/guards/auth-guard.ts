import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GlobalConstant } from '../constant/Constant';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const localData = localStorage.getItem(GlobalConstant.LOCAL_LOGIN_DATA_KEY);
  if (localData === null) {
    router.navigateByUrl('/login');
    return false;
  } else {
    return true;
  }
};
