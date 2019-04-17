import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../client-services/user.service';
import {SharedService} from '../../../client-services/shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('x') searchForm: NgForm;
  content = 'input which type of video course you want';
  uid = '';
  constructor(private router: Router, private userService: UserService, private sharedService: SharedService,
              private route: ActivatedRoute) { }

  search() {
    this.content = this.searchForm.value.content;
    this.userService.search(this.content).subscribe(
      (data: any) => {
        this.sharedService.items = data.items;
        console.log(data.items);
        this.router.navigate(['usr/' + this.uid + '/video']);
      }
    );
  }

  ngOnInit() {
    this.content = 'input which type of video course you want';
    this.route.params.subscribe(params => {
        this.uid = params['uid'];
      }
    );
  }
}
