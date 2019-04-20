import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from './user.service';
import {SharedService} from './shared.service';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private userService: UserService, private router: Router, private sharedService: SharedService) {
//   }
//
//   async f() {
//     return await this.userService.loggedin().toPromise();
//   }

//   // @ts-ignore
//   async canActivate() {
//     let auth = false;
//     await this.f().then(data => {
//       // // const user = data.toString();
//       // console.log('auth' + data);
//       // const user = data;
//       //
//       // if (user) {
//       //   this.sharedService.user = user;
//       //
//       //   console.log('auth-sharedSvc: ' + this.sharedService.user._id);
//       //
//       //   auth = true;
//       // } else {
//       //   this.router.navigate(['/login']);
//       // }
//       console.log('auth-sharedSvc: ' + this.sharedService.user._id);
//       auth = true;
//     });
//     return auth;
//   }
// }

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate() {
    return this.userService.loggedin();
  }
}
