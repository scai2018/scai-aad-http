import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GraphApiProvider } from '../../providers/graph-api/graph-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  projects:Object[];

  constructor(public navCtrl: NavController, private graphApi:GraphApiProvider) {

  }

  getProjectsList(){
    this.graphApi.getProjectsList().subscribe(
      res=>{
        this.projects = res['value'];
        console.log("Found projects : " + this.projects.length + ": ", this.projects);
      },
      err => {
        console.log("Error Fetching data...", err);
      }
    );
    console.log("Fetching data...");
  }
}
