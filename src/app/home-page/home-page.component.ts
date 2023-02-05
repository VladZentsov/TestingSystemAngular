import { Component, OnInit } from '@angular/core';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
import { TestService } from '../services/test.service';
import { TestNameModel } from '../models/TestNameModel';
import { TestDescriptionModel } from '../models/TestDescriptionModel';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
    ]
})
export class HomePageComponent {

  avaliableTests?:TestNameModel[]

  testDescription?: TestDescriptionModel

  checked = false;

  constructor(private jwtHelper: JwtHelperService, private router: Router, private authenticateService:AuthenticateService, private testService:TestService)  {
  }

  ngOnInit(): void {
    if(!this.authenticateService.isUserAuthenticated()){
      this.router.navigate(['login']);
    }
  }

  isUserAuthenticated() {
    let isAuth =  this.authenticateService.isUserAuthenticated()

    if(!isAuth){
      this.avaliableTests = undefined
    }

    if(isAuth && this.avaliableTests == undefined){
      this.getAvaliableTests()
    }

    return isAuth
  }

  getAvaliableTests() {
    this.testService.getAvaliableTests().subscribe(
      response=>{
        this.avaliableTests = response
      }
    )
  }

  getTestDescription(id: string){
    this.testService.getTestDescription(id).subscribe(
      response =>{
        this.testDescription = response
      }
    )
  }


}
