import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//"token_type":"Bearer",
//"scope":"Sites.Read.All User.Read User.ReadBasic.All",
//"expires_in":"3599",
//"ext_expires_in":"0",
//"expires_on":"1528653409",
//"not_before":"1528649509",
//"resource":"https://graph.microsoft.com",
//"access_token":"eyJ0e...."
export class UserInfo {
  tokenType:string;
  scope:string;
  expiresIn:any;
  extExpiresIn:any;
  expiresOn:any;
  notBefore:any;
  resource:string;
  accessToken:string;
}

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  TENANT_NAME = 'common';
  APP_ID = "60f1d22c-e306-4418-ba87-ae6644b5081b"; // 'eb04b05c-ea1b-44f7-856a-775815fbe571';
  REDIRECT_URL = "http://localhost:8100";
  RESOURCE_URL = 'https://graph.microsoft.com';
  AUTHORITY_URL = 'https://login.microsoftonline.com/' + this.TENANT_NAME + '/';
 
  userInfo:UserInfo = new UserInfo();

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }
 // Use HTTP POST to login to MS AAD OAuth2.0 ednpoint
 // https://login.microsoftonline.com/common/oauth2/token
 loginOauth2(username:string, password:string): void {
  let url = "https://login.microsoftonline.com/common/oauth2/token";
  let headerOptions:HttpHeaders = new HttpHeaders();
  headerOptions.append("Content-Security-Policy", "script-src 'self' https://login.microsoftonline.com");

  /* Method#2: Use FormData in Angular 5 */
  let formData = new FormData();
  formData.append('client_id', this.APP_ID);
  formData.append("resource", this.RESOURCE_URL);
  formData.append("username", username); 
  formData.append("password", password);
  formData.append("grant_type", "password");

  let body =  formData;
 
  console.log("Enter loginOauth2...." + url + "..." , body);
  // convert the Response to JSON and the access the data in it
  this.http.post(url,body, {headers: headerOptions})
    .subscribe(
      data => {
        console.log("Response: " , data);
        this.userInfo.accessToken = data['access_token'];
      },
      err => {
        console.log("Error occured", err);
      }
    );
  console.log("Done loginOauth2!");

  }

}
