import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './views/usr/login/login.component';
import {HomePageComponent} from './views/home-page/home-page.component';
import {RegisterComponent} from './views/usr/register/register.component';
import {ProfileComponent} from './views/usr/profile/profile.component';
import {AdminManageComponent} from './views/usr/admin-manage/admin-manage.component';
import {AdminProfileComponent} from './views/usr/admin-profile/admin-profile.component';
import {SearchComponent} from './views/registration/search/search.component';
import {VideoListComponent} from './views/video-list/video-list.component';
import {FacultyAddCourseComponent} from './views/usr/faculty-add-course/faculty-add-course.component';
import {VisitorSearchComponent} from './views/usr/visitor-search/visitor-search.component';
import {AuthGuard} from './client-services/auth-guard.service';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'visitor', component: VisitorSearchComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile/:uid', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'usr/:uid/manage', component: AdminManageComponent, canActivate: [AuthGuard]},
  {path: 'usr/:uid/profile/:uuid', component: AdminProfileComponent, canActivate: [AuthGuard]},
  {path: 'usr/:uid/search', component: SearchComponent, canActivate: [AuthGuard]},
  {path: 'usr/:uid/video', component: VideoListComponent, canActivate: [AuthGuard]},
  {path: 'usr/:uid/faculty', component: FacultyAddCourseComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing = RouterModule.forRoot(routes, {useHash: true});
