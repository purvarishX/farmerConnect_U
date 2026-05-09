import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Category } from './pages/category/category';
import { authGuard } from './core/guards/auth-guard';
import { Master } from './pages/master/master';
import { Product } from './pages/product/product';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home,
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register,
    },
    {
        path: 'master',
        component: Master,
        canActivate: [authGuard]
    },
    {
        path: 'product',
        component: Product,
        canActivate: [authGuard]
    }
];
