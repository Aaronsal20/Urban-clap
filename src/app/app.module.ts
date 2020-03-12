import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './UI/header/header.component';
import { DrawerComponent } from './UI/drawer/drawer.component';
import { LayoutComponent } from './layout/layout.component';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { VerifyEmailComponent } from './register/verify-email/verify-email.component';
import { RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DrawerComponent,
    LayoutComponent,
    RegisterComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    LoginModule
  ],
  providers: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
