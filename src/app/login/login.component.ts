import { AuthService } from './../auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private auth: AuthService) { }


  login(){
    this.auth.login();
  }
}
