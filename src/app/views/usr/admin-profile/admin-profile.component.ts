import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../client-services/user.service';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../client-services/shared.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  @ViewChild('x') profileForm: NgForm;
  user = {
    username: '',
    password: '',
    role: ''
  };
  uuid: String;
  uid: String;
  constructor(private route: ActivatedRoute, private userService: UserService,
              private router: Router, public sharedService: SharedService) { }

  updateUser() {
    this.user.username = this.profileForm.value.username;
    this.user.password = this.profileForm.value.password;
    this.userService.updateUser(this.user).subscribe(
      (data: any) => {
        this.router.navigate(['usr/' + this.uid + '/manage']);
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.uid = params['uid'];
        this.uuid = params['uuid'];
        this.userService.findUserById(this.uuid).subscribe(
          (data: any) => {
            this.user = data;
          }
        );
      }
    );
  }
}
