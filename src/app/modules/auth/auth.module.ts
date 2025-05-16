import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from './components/signup/signup.component';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
