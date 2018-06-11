import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { Observable } from 'rxjs/observable';

/*
  Generated class for the GraphApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GraphApiProvider {

  constructor(public http: HttpClient, private authService:AuthProvider) {
    console.log('Hello GraphApiProvider Provider');
  }

  getProjectsList() : Observable<Object>{
    let url = "https://graph.microsoft.com/v1.0/sites/root/lists/da7cd400-0cd9-4dde-9167-3049747f195a/items?expand=fields";
    let resp = this.http.get(url, {headers:{"Authorization":"Bearer " + this.authService.userInfo.accessToken}});
    resp.subscribe(
      res => {
        console.log("The projects list: " , res);
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
    return resp;
  }
 
}
