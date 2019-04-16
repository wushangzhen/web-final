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
    this.user.role = this.loginForm.value.role;
    this.sharedService.user = this.user;
    // According to checkbox to choose the role
    switch (this.loginForm.value.role) {
      case 'admin':
        this.validateAdmin(this.user);
        break;
      case 'faculty':
        this.validateFaculty(this.user);
        break;
      case 'student':
        this.validateStudent(this.user);
        break;
    }
  }

  validateAdmin(user: any) {
    this.userService.loginAdmin(user).subscribe(
      (data: any) => {
        this.router.navigate(['/profile']);
      }
    );
  }

  validateFaculty(user:any) {

  }

  validateStudent(user:any) {

  }


  ngOnInit() {

  }

}
