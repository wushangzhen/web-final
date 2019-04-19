import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../client-services/user.service';
import {SharedService} from '../../../client-services/shared.service';
import {CourseService} from '../../../client-services/course.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('x') searchForm: NgForm;
  content = 'input which type of video course you want';
  uid = '';
  userCourses = [];
  availableCourses = [];
  url = 'https://www.youtube.com/watch?v=';
  constructor(private router: Router, private userService: UserService, public sharedService: SharedService,
              private route: ActivatedRoute, private courseService: CourseService) { }

  search() {
    this.content = this.searchForm.value.content;
    this.userService.search(this.content).subscribe(
      (data: any) => {
        this.sharedService.items = data.items;
        this.router.navigate(['usr/' + this.uid + '/video']);
      }
    );
  }

  deleteCourse(course: any) {
    this.courseService.deleteCourse(this.uid, course._id).subscribe(
      (data: any) => {
        this.deleteHelper(course._id);
        this.ngOnInit();
      },
      (error: any) => {
        this.deleteHelper(course._id);
        // this.ngOnInit();
      }
    );
  }
  deleteHelper(cid: any) {
    for (const i in this.sharedService.user.courses) {
      if (this.sharedService.user.courses[i]._id === cid) {
        const j = +i;
        this.sharedService.user.courses.splice(j, 1);
        this.userService.updateUser(this.sharedService.user).subscribe(
          (data: any) => {
            this.sharedService.user = data;
        }
        );
      }
    }
  }
  chooseCourse(course: any) {
    this.sharedService.user.courses.push(course);
    this.userService.updateUser(this.sharedService.user).subscribe(
      (data: any) => {
        // this.router.navigate(['usr/' + this.uid + '/search']);
        this.ngOnInit();
      }
    );
  }


  ngOnInit() {
    this.content = 'input which type of video course you want';
    this.route.params.subscribe(params => {
        this.uid = params['uid'];
      }
    );
    this.courseService.findAllCourses().subscribe(
      (data: any) => {
        this.availableCourses = data;
      }
    );
    this.userService.findUserById(this.uid).subscribe(
      (data: any) => {
        this.sharedService.user = data;
        this.userCourses = this.sharedService.user.courses;
      }
    );
  }
}
