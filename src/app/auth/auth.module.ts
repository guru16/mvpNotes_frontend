import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent, ResetPasswordComponent, ForgetPasswordComponent, RegisterComponent } from './';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    NgxSpinnerModule
  ]
})
export class AuthModule { }
