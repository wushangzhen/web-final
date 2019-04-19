import {Component, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../../../client-services/shared.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../client-services/user.service';
import {NgForm} from '@angular/forms';
import {CourseService} from '../../../client-services/course.service';

@Component({
  selector: 'app-falcuty-add-course',
  templateUrl: './faculty-add-course.component.html',
  styleUrls: ['./faculty-add-course.component.css']
})
export class FacultyAddCourseComponent implements OnInit {
  @ViewChild('x') courseForm: NgForm;
  user: any;
  userCourses = [];
  userId = '';
  course = {
    videoId: '',
    channelTitle: '',
    description: '',
    publishedAt: '',
    thumbnail: 'http://www.ip-shield.com/img/courses.png',
    title: '',
  };
  constructor(public sharedService: SharedService, private route: ActivatedRoute, private userService: UserService,
              private courseService: CourseService) { }
  addCourse() {
    this.course.videoId = this.courseForm.value.videoId;
    this.course.channelTitle = this.courseForm.value.channelTitle;
    this.course.description = this.courseForm.value.description;
    this.course.thumbnail = this.courseForm.value.thumbnail;
    this.course.title = this.courseForm.value.title;
    console.log(this.sharedService.user.courses);
    this.courseService.createCourse(this.userId, this.course).subscribe(
      (data: any) => {
        console.log(data);
        this.sharedService.user.courses.push(data);
        console.log(this.sharedService.user.courses);
        this.userService.updateUser(this.sharedService.user).subscribe(
          (data1: any) => {
                    console.log(data1);
                    this.ngOnInit();
                }
        );
      }
    );
  }
  // delete all student's course
  deleteCourse(course: any) {
    console.log(course);
    // this.deleteHelper2(course._id);
    this.courseService.deleteCourse(this.userId, course._id).subscribe(
      (data: any) => {
        console.log(data);
        this.userService.findAllStudents().subscribe(
          (students: any) => {
            this.deleteHelper(students, course);
            this.deleteHelper2(course._id);
            this.ngOnInit();
          },
          (err: any) => {
          this.deleteHelper2(course._id);
          }
        );
      }
    );
  }
  // delete all students' courses
  deleteHelper(students: any, course: any) {
    let i = 0;
    for (; i < students.length; i++) {
      for (const j in students[i].courses) {
        console.log(students[i].courses[j]);
        if (students[i].courses[j]._id === course._id) {
          const k = +j;
          students[i].courses[j].splice(k, 1);
          this.userService.updateUser(students[i]).subscribe(
            (data: any) => {
              console.log(data);
              // this.sharedService.user = data;
            }
          );
        }
      }
    }
  }
  // delete current page array
  deleteHelper2(cid: any) {
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

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.userId = params['uid'];
        this.userService.findUserById(this.userId).subscribe(
          (data: any) => {
            this.user = data;
            this.sharedService.user = data;
            this.userCourses = this.user.courses;
          }
        );
      }
    );
  }

}
