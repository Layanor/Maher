import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2-data';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

const name = 'XSRF-TOKEN' + "=";
var decodedCookie = decodeURIComponent(document.cookie);
var ca = decodedCookie.split(';');
for (var i = 0; i < ca.length; i++) {
 var c = ca[i];
 while (c.charAt(0) == ' ') {
   c = c.substring(1);
 }
 if (c.indexOf(name) == 0) {
   var tt = c.substring(name.length, c.length);
   console.log("ttt" , tt) 
 }
}

export class CustomAdaptor extends RemoteSaveAdaptor {
  public xsrf: string;
  public baseurl: string;
  public authtoken: string;
  public sub: Subscription;

  constructor(public http: HttpClient, private authorize: AuthorizeService, private router: ActivatedRoute, private tokenExtractor: HttpXsrfTokenExtractor, @Inject('BASE_URL') baseUrl: string, private notificationsService: NotificationsService) {
      
      super();
    this.baseurl = baseUrl

    if (this.xsrf == undefined || this.xsrf == '') {
      const name = 'XSRF-TOKEN' + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          this.xsrf = c.substring(name.length, c.length);
          // console.log("md-com-xsrf", this.xsrf)
        }
      }
      // console.log("md-com-xsrff", this.xsrf)
    }
    if (this.authtoken == undefined || this.authtoken == '') {
      this.sub = this.authorize.getAccessToken().pipe(map(token => {

        if (token != null) {
          this.authtoken = token

        }
      })).subscribe();
    }
  }


  override processResponse(data, ds?, query?, xhr?: XMLHttpRequest, request?, changes?, e?): Object {
    console.log(data)
   
    console.log(ds)
    console.log(query)
    if (xhr != undefined) {
      console.log("xhrstatus" ,xhr.status)
      console.log("xhrstatus", (JSON.parse(xhr.response)).name)
      this.notificationsService.warn("dsdsds","sdsdsd")
    }
   
    console.log("xhr" ,xhr)
    console.log(changes)
    console.log(e)

    const original = super.processResponse.apply(this, arguments);

    return { result: original.result, count: original.count, xrh: xhr.status};
    }


    //beforeSend(dm: DataManager, request: XMLHttpRequest) { 
    //    request.open('POST', 'UrlDatasource');                                    // customizing the Url of lHttpRequest 
    //   request.setRequestHeader('Content-Type', 'application/json; charset=utf-8'); 
    //   // dm.dataSource.headers = [{ 'Authorization': 'bearertoken' }];  // setting header 
    //     dm.dataSource.headers = [{ 'X-XSRF-TOKEN': tt }];  // setting header 
         
     
    //} 
} 
