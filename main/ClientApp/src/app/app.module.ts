import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AuthorizeInterceptor } from '../api-authorization/authorize.interceptor';
import { AppRoutingModule } from './AppRoutingModule';
import {
  MDBBootstrapModule,
  WavesModule,
  ButtonsModule,
} from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageServiceComponent } from './Loging/MessageService/MessageService.component';
import { GrideModule } from './Gride/Gride.module';
import { HttpdataService } from './service/httpdata.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CoreModule } from './core/core.module';
import { DirectiveModule } from './Directive/directive.module';
import { ErrorLoggingInterceptor } from './Loging/Error-logging-interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CanLoadmuder } from '../api-authorization/CanLoad/CanLoadmuder';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import localear from '@angular/common/locales/ar-SA';
import { registerLocaleData } from '@angular/common';
import { CanLoadcalldir } from '../api-authorization/CanLoad/CanLoadcalldir';
import { CanLoadhosp } from '../api-authorization/CanLoad/CanLoadhosp';
import { CanLoadclinic } from '../api-authorization/CanLoad/CanLoadclinic';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

import { ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localear);
@NgModule({
  declarations: [AppComponent, HomeComponent, MessageServiceComponent],
  imports: [
    UploaderModule,
    ReactiveFormsModule,
    DirectiveModule,
    CoreModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SimpleNotificationsModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    WavesModule,
    ButtonsModule,
    GrideModule.forRoot(),
    AppRoutingModule,
    NgbModule,
  ],
  providers: [
    HttpdataService,
    CanLoadmuder,
    CanLoadcalldir,
    CanLoadhosp,
    CanLoadclinic,
    { provide: LOCALE_ID, useValue: 'ar-SA' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizeInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorLoggingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
