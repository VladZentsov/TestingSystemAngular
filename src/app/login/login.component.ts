import { Component, OnInit } from '@angular/core';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import configurl from '../../assets/config/config.json';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
    ]
})
export class LoginComponent {

  invalidLogin?: boolean;

  constructor(private router: Router, private authenticateService:AuthenticateService) { }

  public login = (form: NgForm) => {
    const credentials = JSON.stringify(form.value);

    this.authenticateService.login(credentials).subscribe(
      response=>{
      this.invalidLogin = false;
      this.router.navigate(["/home"]);
      }, err => {
        this.invalidLogin = true;
      })
  }

  isUserAuthenticated() {
    return this.authenticateService.isUserAuthenticated
  }


}
