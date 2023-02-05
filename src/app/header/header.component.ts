import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  userName?:string;

  constructor(private router: Router, private authenticateService:AuthenticateService) { }

  isUserAuthenticated() {
    let result =  this.authenticateService.isUserAuthenticated()

    if(result == true && this.userName==undefined){
      this.userName = this.authenticateService.getUsername()

    }

    return result
  }

  public logOut = () => {
    localStorage.removeItem("jwt");
    this.userName=undefined
  }

  ngOnInit(): void {
  }

}
