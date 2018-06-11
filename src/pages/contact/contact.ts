import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  username:string = "steve.cai@citizant.com";
  password:string = "YOUR_PASSWORD";

  constructor(public navCtrl: NavController, private auth:AuthProvider) {

  }

  // Login
  signIn() {
    this.auth.loginOauth2(this.username, this.password);
    console.log("Loing()...");
  }
}
