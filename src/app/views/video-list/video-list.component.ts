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
  course = {
    videoId: '',
    channelTitle: '',
    description: '',
    publishedAt: '',
    thumbnail: '',
    title: '',
  };
  user: any;
  constructor(private sharedService: SharedService, public sanitizer: DomSanitizer, private route: ActivatedRoute,
              private userService: UserService, private router: Router) { }
  chooseCourse(item: any) {
    this.course.videoId = item.id.videoId;
    this.course.channelTitle = item.snippet.channelTitle;
    this.course.description = item.snippet.description;
    this.course.publishedAt = item.snippet.publishedAt;
    this.course.thumbnail = item.snippet.thumbnails.high.url;
    this.course.title = item.snippet.title;
    this.user.courses.push(this.course);
    this.sharedService.user = this.user;
    this.userService.updateUser(this.user).subscribe(
      (data: any) => {
        this.router.navigate(['usr/' + this.uid + '/search']);
      }
    );
  }

  ngOnInit() {
    this.items = this.sharedService.items;
    this.user = this.sharedService.user;
    console.log(this.user);
    this.route.params.subscribe(params => {
        this.uid = params['uid'];
      }
    );
  }

}
