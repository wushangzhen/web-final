import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {SharedService} from './shared.service';
// import 'rxjs/Rx';

@Injectable()

export class UserService {
  constructor(private http: HttpClient, private sharedService: SharedService, private router: Router) {}
  baseUrl = environment.baseUrl;

  loginAdmin(user: any) {
    return this.http.post(this.baseUrl + 'api/login', user, {withCredentials: true});
  }
  register(user: any) {
    return this.http.post(this.baseUrl + 'api/register', user, {withCredentials: true});
  }
  findAllFaculties() {
    return this.http.get(this.baseUrl + 'api/faculty', {withCredentials: true});
  }
  findAllStudents() {
    return this.http.get(this.baseUrl + 'api/student', {withCredentials: true});
  }
  deleteUser(userId: any) {
    return this.http.delete(this.baseUrl + 'api/' + userId, {withCredentials: true});
  }
  findUserById(userId: String) {
    return this.http.get(this.baseUrl + 'api/' + userId, {withCredentials: true});
  }
  updateUser(user: any) {
    return this.http.put(this.baseUrl + 'api/update', user,{withCredentials: true});
  }
  loginStudent(user: any) {
    return this.http.post(this.baseUrl + 'api/login', user, {withCredentials: true});
  }
  loginFaculty(user: any) {
    return this.http.post(this.baseUrl + 'api/login', user, {withCredentials: true});
  }
  search(content: any) {
    const url = 'https://www.googleapis.com/youtube/v3/search' +
      '?part=snippet&q=' + content + '&key=AIzaSyB4QGaLnSwXIzN9aq0y_QjMXfEGmUoIdCE';
    return this.http.get(url);
  }
}
