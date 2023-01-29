"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ej2_data_1 = require("@syncfusion/ej2-data");
//import type { DataResult, DataOptions, Query, CrudOptions  } from '@syncfusion/ej2-angular-grids';
var CustomRemoteSaveAdaptor = /** @class */ (function (_super) {
    __extends(CustomRemoteSaveAdaptor, _super);
    function CustomRemoteSaveAdaptor() {
        return _super.call(this) || this;
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
    CustomRemoteSaveAdaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes) {
        //  const original = super.processResponse.apply(this, arguments);
        //  const songs = original.result.map((item) => { return new Song(item); });
        console.log(data);
        console.log("data", data);
        console.log(query);
        if (xhr != undefined) {
            console.log(xhr.getResponseHeader('responseURL'));
            if (xhr.status == 200) {
            }
            if (xhr.status == 201) {
            }
            if (xhr.status == 202) {
            }
            //this.notificationsService.success("iiuiuuiu", "uiyuyuyuyuy")
            console.log("xhrstatus", xhr.status);
            console.log("xhrstatus", (JSON.parse(xhr.response)).name);
        }
        console.log("xhr", xhr);
        console.log(changes);
        //console.log(e)
        var original = _super.prototype.processResponse.apply(this, arguments);
        //7return this.base.processResponse.apply(this, [data, ds, query, xhr, request, changes]);
        //result = this.base.processResponse.apply(this, [data, ds, query, xhr, request, changes]);
        //return result; 
        return { result: original.result, count: original.count };
    };
    return CustomRemoteSaveAdaptor;
}(ej2_data_1.RemoteSaveAdaptor));
exports.CustomRemoteSaveAdaptor = CustomRemoteSaveAdaptor;
//# sourceMappingURL=CustomRemoteSaveAdaptor.js.map