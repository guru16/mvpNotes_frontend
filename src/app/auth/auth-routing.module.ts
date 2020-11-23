import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent, ResetPasswordComponent, ForgetPasswordComponent, RegisterComponent } from './';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'reset-password/:userId',
        component: ResetPasswordComponent,
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
