import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import {
  MDBBootstrapModule,
  WavesModule,
  ButtonsModule,
} from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { ApiAuthorizationModule } from '../../api-authorization/api-authorization.module';
import { DirectiveModule } from '../Directive/directive.module';
import { DumproutComponent } from './dumprout/dumprout.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [NavMenuComponent, DumproutComponent],
  imports: [
    BrowserModule,
    CommonModule,
    DirectiveModule,
    RouterModule,
    ApiAuthorizationModule,
    MDBBootstrapModule.forRoot(),
    WavesModule,
    ButtonsModule,

  ],
  exports: [NavMenuComponent, DumproutComponent],
})
export class CoreModule {}
