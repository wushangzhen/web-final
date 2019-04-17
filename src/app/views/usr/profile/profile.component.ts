import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../client-services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: {};
  userId: String;
  constructor(private route: ActivatedRoute, private userService: UserService) { }

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
}
