import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { TestingPageComponent } from './testing-page/testing-page.component';

const routes: Routes = [
  {path:'home', component: HomePageComponent},
  {path:'login', component: LoginComponent},
  {path:'home/testingPage/:id', component: TestingPageComponent},
  {path: '', redirectTo: "/home", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
