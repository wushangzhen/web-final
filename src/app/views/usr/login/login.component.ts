import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../client-services/shared.service';
import {UserService} from '../../../client-services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: '',
    role: '',
  };

  @ViewChild('f') loginForm: NgForm;
  constructor(private sharedService: SharedService, private userService: UserService, private router: Router) {}

  // Seperate 3 roles to jump into different pages
  login() {
    this.user.username = this.loginForm.value.username;
    this.user.password = this.loginForm.value.password;
    // this.user.role = this.loginForm.value.role;
    this.userService.findUserByUsername(this.user.username).subscribe(
      (data: any) => {
        // console.log(data);
        this.sharedService.user = data;
        // According to checkbox to choose the role
        console.log(data.role);
        switch (data.role) {
          case 'admin':
            data.password = this.loginForm.value.password;
            this.validateAdmin(data);
            break;
          case 'faculty':
            data.password = this.loginForm.value.password;
            this.validateFaculty(data);
            break;
          case 'student':
            data.password = this.loginForm.value.password;
            this.validateStudent(data);
            break;
        }
      }
    );
  }

  validateAdmin(user: any) {
    this.userService.loginAdmin(user).subscribe(
      (data: any) => {
        console.log(data);
        this.sharedService.user = data;
        this.router.navigate(['usr/' + data._id + '/manage']);
      }
    );
  }

  validateFaculty(user: any) {
    this.userService.loginFaculty(user).subscribe(
      (data: any) => {
        // this.sharedService.user = data;
        this.router.navigate(['usr/' + data._id + '/faculty']);
      }
    );
  }

  validateStudent(user: any) {
    this.userService.loginStudent(user).subscribe(
      (data: any) => {
        this.sharedService.user = data;
        this.router.navigate(['usr/' + data._id + '/search']);
      }
    );
  }
  ngOnInit() {
  }

}
