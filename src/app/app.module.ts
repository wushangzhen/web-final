import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule, routing} from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/usr/login/login.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { RegisterComponent } from './views/usr/register/register.component';
import { ProfileComponent } from './views/usr/profile/profile.component';
import {SharedService} from './client-services/shared.service';
import {UserService} from './client-services/user.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule,
  ],
  providers: [SharedService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
