import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../client-services/shared.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../client-services/user.service';


@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  items = [];
  uid = '';
  video = {
    videoId: '',
    channelTitle: '',
    description: '',
    publishedAt: '',
  };
  user: any;
  constructor(private sharedService: SharedService, public sanitizer: DomSanitizer, private route: ActivatedRoute,
              private userService: UserService, private router: Router) { }
  chooseCourse(item: any) {
    this.video.videoId = item.id.videoId;
    this.video.channelTitle = item.snippet.channelTitle;
    this.video.description = item.snippet.description;
    this.video.publishedAt = item.snippet.publishedAt;
    this.user.courses.push(this.video);
    this.userService.updateUser(this.user).subscribe(
      (data: any) => {
        this.router.navigate(['/profile/' + this.uid]);
      }
    );
  }

  ngOnInit() {
    this.items = this.sharedService.items;
    this.user = this.sharedService.user;
    this.route.params.subscribe(params => {
        this.uid = params['uid'];
      }
    );
  }

}
