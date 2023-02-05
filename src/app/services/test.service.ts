import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import configurl from '../../assets/config/config.json';
import { ResultModel } from '../models/ResultModel';
import { Test } from '../models/Test';
import { TestDescriptionModel } from '../models/TestDescriptionModel';
import { TestingAnswer } from '../models/TestingAnswer';
import { TestNameModel } from '../models/TestNameModel';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient, private authenticateService: AuthenticateService) { }

  url = configurl.apiServer.url + '/api/Test/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAvaliableTests():Observable<TestNameModel[]>{
    let headers = this.authenticateService.getTokenHeaders()

    let tests = this.http.get<TestNameModel[]>(this.url + "avaliableTests", { headers: headers} )

    return tests;
  }

  getTestDescription(testId: string):Observable<TestDescriptionModel>{
    let headers = this.authenticateService.getTokenHeaders()

    let testDescription = this.http.get<TestDescriptionModel>(this.url + "testDescription/"+testId, { headers: headers} )

    return testDescription
  }

  getTest(testId:string):Observable<Test>{
    let headers = this.authenticateService.getTokenHeaders()

    let test = this.http.get<Test>(this.url + "startTest/"+testId, { headers: headers} )

    return test
  }

  checkResults(testingAnswer:TestingAnswer):Observable<ResultModel>{
    let headers = this.authenticateService.getTokenHeaders()

    let body = JSON.stringify(testingAnswer);

    return this.http.post<ResultModel>(this.url + "checkResults", body, { headers: headers})
  }
}
