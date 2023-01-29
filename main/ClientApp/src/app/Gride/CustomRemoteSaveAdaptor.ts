import { DataManager, RemoteSaveAdaptor, DataResult, DataOptions, Query, CrudOptions } from '@syncfusion/ej2-data';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ajax } from '@syncfusion/ej2-base'; 
//import type { DataResult, DataOptions, Query, CrudOptions  } from '@syncfusion/ej2-angular-grids';

export class CustomRemoteSaveAdaptor extends RemoteSaveAdaptor {
  constructor() {
    super();
  }

  //beforeSend(dm: DataManager, request: XMLHttpRequest, settings: Ajax) {
  //  request.onerror = function () {
  //    //debugger;
  //    console.log("--Error Request--");

  //    //Here i want to return event data to the Adaptor --> Scheduler event
  //    let localData = [{ Id: 1, Subject: "Subject 1", StartTime: new Date(), EndTime: new Date() }]


  //  }
  //  console.log("--beforeSend--");
  //  super.beforeSend(dm, request, settings);
  //}

  //processQuery(dm: DataManager, query: Query, hierarchyFilters?: Object[]) {
  //  let original = super.processQuery.apply(this, arguments);
  //  let data = JSON.parse(original.data);

  //  return {
  //    data: JSON.stringify({ value: data }),
  //    url: `${original.url}?offset=${data.skip}&limit=${data.take}`,
  //    pvtData: original.pvtData,
  //    type: 'GET',
  //    contentType: 'application/json; charset=utf-8'
  //  };
  //}

  //processResponse(data, ds, query, xhr, request, changes) {
  //  return {
  //    result: super.processResponse.apply(this, arguments),
  //    count: xhr.getResponseHeader('X-Total-Count')
  //  };
  //};

  public override processResponse(data: DataResult, ds?: DataOptions,
    query?: Query, xhr?: XMLHttpRequest, request?: Ajax, changes?: CrudOptions): Object {

  //  const original = super.processResponse.apply(this, arguments);
  //  const songs = original.result.map((item) => { return new Song(item); });
    console.log(data)

    console.log("data",data)
    console.log(query)
    if (xhr != undefined) {
      console.log(xhr.getResponseHeader('responseURL'))

      if (xhr.status == 200) {

      }
      if (xhr.status == 201) {

      }
      if (xhr.status == 202) {

      }
      //this.notificationsService.success("iiuiuuiu", "uiyuyuyuyuy")
      console.log("xhrstatus", xhr.status)
      console.log("xhrstatus", (JSON.parse(xhr.response)).name)
    }

    console.log("xhr", xhr)
    console.log(changes)
    //console.log(e)

    const original = super.processResponse.apply(this, arguments);
   //7return this.base.processResponse.apply(this, [data, ds, query, xhr, request, changes]);

    //result = this.base.processResponse.apply(this, [data, ds, query, xhr, request, changes]);
    //return result; 
    return { result: original.result, count: original.count };
  }


} 
