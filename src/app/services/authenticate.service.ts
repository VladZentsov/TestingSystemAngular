import { Injectable } from '@angular/core';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import configurl from '../../assets/config/config.json';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',

})
export class AuthenticateService {

  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  url = configurl.apiServer.url + '/api/Authenticate/';

   getTokenHeaders():HttpHeaders{
    let header = new HttpHeaders();
    let token = localStorage.getItem('jwt') as string;

    let  headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${token}`);

    return headers
  }

  getUsername():string{
    let token = localStorage.getItem('jwt') as string;
    let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));

    var userName = decodedJWT["Name"]
    return userName
  }

  login(credentials: string):Observable<any>{

    return this.http.post(this.url +"login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).pipe(map(response=>{
        const token = (<any>response).token;
        localStorage.setItem("jwt", token);
    }))
  }

  isUserAuthenticated():boolean {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
}
