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
import { AdminManageComponent } from './views/usr/admin-manage/admin-manage.component';
import { AdminProfileComponent } from './views/usr/admin-profile/admin-profile.component';
import { SearchComponent } from './views/registration/search/search.component';
import { VideoListComponent } from './views/video-list/video-list.component';
import {CourseService} from './client-services/course.service';
import { FacultyAddCourseComponent } from './views/usr/faculty-add-course/faculty-add-course.component';
import { VisitorSearchComponent } from './views/usr/visitor-search/visitor-search.component';
import {AuthGuard} from './client-services/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    RegisterComponent,
    ProfileComponent,
    AdminManageComponent,
    AdminProfileComponent,
    SearchComponent,
    VideoListComponent,
    FacultyAddCourseComponent,
    VisitorSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule,
  ],
  providers: [SharedService, UserService, CourseService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
