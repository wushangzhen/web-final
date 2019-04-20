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


  // TODO Admin must be only one
  register() {
    this.user.username = this.registerForm.value.username;
    this.user.password = this.registerForm.value.password;
    this.user.role = this.registerForm.value.role;
    this.userService.register(this.user).subscribe(
      (user: any) => {
        this.sharedService.user = user;
        this.router.navigate(['/login']);
        // this.router.navigate(['/profile', this.sharedService.user._id]);
      }
    );
  }
  ngOnInit() {
  }

}
