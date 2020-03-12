import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './register/verify-email/verify-email.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', component: LayoutComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
