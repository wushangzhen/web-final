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
    return this.http.post(this.baseUrl + 'api/admin/login', user, {withCredentials: true});
  }


}
