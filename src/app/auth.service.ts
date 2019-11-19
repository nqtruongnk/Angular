import { switchMap } from 'rxjs/operators';

import { UserService } from './user.service';
import { AppUser } from './modules/app-user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { ActivatedRoute } from '@angular/router';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute) { 
    this.user$=afAuth.authState;
  }
  login(){
    let returnUrl= this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$.pipe(switchMap(user => {
      if(user) return this.userService.get(user.uid).valueChanges();
      return Observable.of(null);
    }))
    

      
  }  
  
}
