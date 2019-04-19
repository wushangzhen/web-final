import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../client-services/user.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-visitor-search',
  templateUrl: './visitor-search.component.html',
  styleUrls: ['./visitor-search.component.css']
})
export class VisitorSearchComponent implements OnInit {
  @ViewChild('x') searchForm: NgForm;
  items = [];
  content = '';
  url = 'https://www.youtube.com/watch?v=';
  constructor(private userService: UserService, private router: Router) {}
  search() {
    this.content = this.searchForm.value.content;
    this.userService.search(this.content).subscribe(
      (data: any) => {
        this.items = data.items;
        this.ngOnInit();
      }
    );
  }
  chooseCourse() {
    alert('You have to login');
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
