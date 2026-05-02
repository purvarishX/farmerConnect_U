import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { CommonImports } from '../../core/constant/CommonImports';
import { Register } from "../register/register";
import { Header } from "../../shared/components/header/header";
import { GlobalConstant } from '../../core/constant/Constant';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-home',
  imports: [CommonImports.FORM_IMPORTS, Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements AfterViewInit {

  showRegister: boolean = false;
  authSrv = inject(AuthService);

  constructor(private el: ElementRef) {
    // const loggedInUser = localStorage.getItem(GlobalConstant.LOCAL_LOGIN_DATA_KEY);
    // if (loggedInUser !== null) {
    //   console.log(JSON.parse(loggedInUser));
    // }

    const loggedInUser = this.authSrv.getLoginData();
  }

  ngAfterViewInit() {
    this.initRiseAnimation();
    this.initQtyAnimation();
  }

  // Rise animation
  initRiseAnimation() {
    const elements = this.el.nativeElement.querySelectorAll('.rise');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach((el: any) => observer.observe(el));
  }

  // Qty bar animation
  initQtyAnimation() {
    const cards = this.el.nativeElement.querySelectorAll('.product-warm');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.qty-fill').forEach((fill: any) => {
            const width = fill.style.width;
            fill.style.width = '0%';

            setTimeout(() => {
              fill.style.transition = 'width 1.2s ease';
              fill.style.width = width;
            }, 200);
          });
        }
      });
    }, { threshold: 0.3 });

    cards.forEach((el: any) => observer.observe(el));
  }

  // Toast
  showToastWarm(msg: string) {
    const t = document.getElementById('toastWarm');
    if (!t) return;

    t.innerHTML = `<strong style="color:var(--harvest-light)">Added!</strong> ${msg}`;
    t.classList.add('show');

    setTimeout(() => t.classList.remove('show'), 3000);
  }

  // Role selection
  selectRoleWarm(el: HTMLElement) {
    const tabs = document.querySelectorAll('.role-tab');
    tabs.forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }

  showRegisterForm() {
    this.showRegister = true;
  }
}