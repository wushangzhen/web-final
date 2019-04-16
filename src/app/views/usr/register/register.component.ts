import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../client-services/user.service';
import {SharedService} from '../../../client-services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  user = {
    username: '',
    password: '',
    role: ''
  };
  constructor(private router: Router, private userService: UserService, private sharedService: SharedService) { }

  register() {
    this.user.username = this.registerForm.value.username;
    this.user.password = this.registerForm.value.password;
    this.user.role = this.registerForm.value.password;
    switch (this.user.role) {
      case 'admin':
        this.registerAdmin();
        break;
      case 'faculty':
        this.registerFaculty();
        break;
      case 'student':
        this.registerStudent();
        break;
    }
  }
  registerAdmin() {}
  registerFaculty() {}
  registerStudent() {}
  ngOnInit() {
  }

}
