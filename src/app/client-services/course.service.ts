import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {SharedService} from './shared.service';
// import 'rxjs/Rx';

@Injectable()

export class CourseService {
  constructor(private http: HttpClient, private sharedService: SharedService, private router: Router) {}
  baseUrl = environment.baseUrl;

  findAllCourses() {
    return this.http.get(this.baseUrl + 'api/courses/find', {withCredentials: true});
  }

  createCourse(userId: any, course: any) {
    return this.http.post(this.baseUrl + 'api/' + userId + '/create', course, {withCredentials: true});
  }

  updateCourse(userId: any, course: any) {
    return this.http.put(this.baseUrl + 'api/' + userId + '/course/' + course._id, course, {withCredentials: true});
  }

  deleteCourse(userId: any, courseId: any) {
    return this.http.delete(this.baseUrl + 'api/' + userId + '/course/' + courseId, {withCredentials: true});
  }

  findCourseById(userId: any, courseId: any) {
    return this.http.get(this.baseUrl + 'api/' + userId + '/course/' + courseId, {withCredentials: true});
  }

  findCourseByVideoId(userId: any, videoId: any) {
    return this.http.get(this.baseUrl + 'api/' + userId + '/course/video/' + videoId, {withCredentials: true});
  }

  search(content: any) {
    const url = 'https://www.googleapis.com/youtube/v3/search' +
      '?part=snippet&q=' + content + '&key=AIzaSyB4QGaLnSwXIzN9aq0y_QjMXfEGmUoIdCE';
    return this.http.get(url);
  }
}
