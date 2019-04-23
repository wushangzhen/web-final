import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../client-services/user.service';
import {SharedService} from '../../../client-services/shared.service';
import {CourseService} from '../../../client-services/course.service';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.css']
})
export class AdminManageComponent implements OnInit {
  faculties: [];
  students: [];
  userId: '';
  user = {};
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
              public sharedService: SharedService, private courseService: CourseService) { }

  deleteUser(user: any) {
    this.userService.deleteUser(user._id).subscribe(
      (data: any) => {

        // TODO delete all courses from every user course and db
        // var i;
        // for (i = 0; i < data.courses.length; i++) {
        //   this.courseService.deleteCourse(data._id, data.courses[i]._id).subscribe(
        //     (data1: any) => {
        //       console.log('delete courses from users');
        //     }
        //   );
        // }
        if (data.role === 'student') {
          this.userService.findAllStudents().subscribe(
            (data1: any) => {
              this.faculties = data1;
            }
          );
        } else if (data.role === 'faculty') {
          this.userService.findAllFaculties().subscribe(
            (data1: any) => {
              this.students = data1;
            }
          );
        }
        this.ngOnInit();
      }
    );
  }
  checkInfo(userId: String) {
    this.router.navigate(['usr/' + this.userId + '/profile/' + userId]);
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.route.params.subscribe(params => {
        this.userId = params['uid'];
      }
    );
    this.userService.findAllFaculties().subscribe(
      (data: any) => {
        this.faculties = data;
      }
    );
    this.userService.findAllStudents().subscribe(
      (data: any) => {
        this.students = data;
      }
    );
  }

}
