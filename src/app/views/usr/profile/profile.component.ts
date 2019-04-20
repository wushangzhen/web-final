import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../client-services/user.service';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../client-services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('x') profileForm: NgForm;
  user = {
    username: '',
    password: '',
    role: '',
    courses: [],
  };
  userId: String;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private router: Router, private sharedService: SharedService) {
  }

  updateUser() {
    this.user.username = this.profileForm.value.username;
    this.user.password = this.profileForm.value.password;
    this.userService.updateUser(this.user).subscribe(
      (data: any) => {
        this.sharedService.user = this.user;
        this.router.navigate(['usr/' + this.userId + '/search']);
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.userId = params['uid'];
        this.userService.findUserById(this.userId).subscribe(
          (data: any) => {
            this.user = data;
          }
        );
      }
    );
  }

  logOut() {
    this.userService.logOut().subscribe(
      (data: any) => this.router.navigate(['']));
  }

}
