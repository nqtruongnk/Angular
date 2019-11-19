import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) { }

  // canActivate(): Observable<boolean>{
  //   this.auth.user$.pipe(
  //     switchMap(user => {
  //     return this.userService.get(user.uid);
  //   })
  //   .map(appUser => appUser.isAdmin));
  // }
  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .map(appUser => appUser.isAdmin);
  }
}
