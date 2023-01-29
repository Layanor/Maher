import { DumproutComponent } from './core/dumprout/dumprout.component';
import { HospAuthorizeGuard } from './../api-authorization/AuthoGuard/HospAuthorizeGuard';
import { CanLoadmuder } from './../api-authorization/CanLoad/CanLoadmuder';
import { HomeComponent } from './home/home.component';
import { Preload } from './Preload';
import { NgModule } from '@angular/core';
import { AdminAuthorizeGuard } from '../api-authorization/AuthoGuard/admin.authorize.guard';
import { CallsDirAuthorizeGuard } from '../api-authorization/AuthoGuard/CallsDirAuthorizeGuard';

import { AuthorizeGuard } from '../api-authorization/AuthoGuard/authorize.guard';
import { CanLoadhosp } from '../api-authorization/CanLoad/CanLoadhosp';
import { CanLoadcalldir } from '../api-authorization/CanLoad/CanLoadcalldir';

import { RouterModule, Routes, UrlSerializer } from '@angular/router';


const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    data: { state: 'home' },
  },

  {
    path: 'muder',
    canLoad: [CanLoadmuder],
    canActivate: [AuthorizeGuard, AdminAuthorizeGuard],
    // outlet: 'muderoutlet',
    loadChildren:
      // () => import(`./muder/muder.module`).then(m => m.MuderModule),
      () => import('./muder/muder.module').then((m) => m.MuderModule),
    // pathMatch: 'full',
    data: { preload: false, state: 'muder' },
  },
  // {
  //   path: 'CallsDir',
  //   canLoad: [CanLoadcalldir],
  //   canActivate: [AuthorizeGuard, CallsDirAuthorizeGuard],
  //   // outlet: 'muderoutlet',
  //   loadChildren:
  //     // () => import(`./muder/muder.module`).then(m => m.MuderModule),
  //     () => import('./call937/Calls.module').then((m) => m.CallsModule),
  //   // pathMatch: 'full',
  //   data: { preload: false, state: 'Calls' },
  // },
  // {
  //   path: 'all',
  //   canLoad: [CanLoadcalldir],
  //   canActivate: [AuthorizeGuard, CallsDirAuthorizeGuard],

  //   loadChildren: () =>
  //     import('./allcall937/allcall937.module').then((m) => m.Allcall937Module),

  //   data: { preload: false, state: 'all' },
  // },
  // {
  //   path: 'excel',
  //   canLoad: [CanLoadcalldir],
  //   canActivate: [AuthorizeGuard, CallsDirAuthorizeGuard],
  //   loadChildren: () =>
  //     import('./importdata/importdata.module').then((m) => m.ImportdataModule),
  //   data: { preload: false, state: 'excel' },
  // },
  // {
  //   path: 'arch',
  //   canLoad: [CanLoadcalldir],
  //   canActivate: [AuthorizeGuard, CallsDirAuthorizeGuard],
  //   // outlet: 'muderoutlet',
  //   loadChildren: () =>
  //     import('./archcall937/archcall937.module').then(
  //       (m) => m.Archcall937Module
  //     ),
  //   // pathMatch: 'full',
  //   data: { preload: false, state: 'archCalls' },
  // },
  // {
  //   path: 'hosp',
  //   canLoad: [CanLoadhosp],
  //   canActivate: [AuthorizeGuard, HospAuthorizeGuard],
  //   loadChildren: () => import('./hosp/hosp.module').then((m) => m.HospModule),
  //   data: { preload: false, state: 'hosp' },
  // },
  // {
  //   path: 'mis',
  //   canLoad: [CanLoadcalldir],
  //   canActivate: [AuthorizeGuard, CallsDirAuthorizeGuard],
  //   // outlet: 'muderoutlet',
  //   loadChildren: () =>
  //     import('./mistreatment/mistreatment.module').then(
  //       (m) => m.MistreatmentModule
  //     ),
  //   // pathMatch: 'full',
  //   data: { preload: false, state: 'mistre' },
  // },
  // {
  //   path: 'low',
  //   canLoad: [CanLoadcalldir],
  //   canActivate: [AuthorizeGuard, CallsDirAuthorizeGuard],
  //   // outlet: 'muderoutlet',
  //   loadChildren: () => import('./low/low.module').then((m) => m.lowModule),
  //   // pathMatch: 'full',
  //   data: { preload: false, state: 'low' },
  // },
  // {
  //   path: 'Clinic',
  //   canLoad: [CanLoadclinic],
  //   canActivate: [AuthorizeGuard, ClinicAuthorizeGuard],
  //   loadChildren: () =>
  //     import('./call937/clinic/Clinic.module').then((m) => m.ClinicModule),
  //   data: { preload: false, state: 'clinic' },
  // },
  {
    path: 'dumprout',
    canActivate: [AuthorizeGuard],
    component: DumproutComponent,
    pathMatch: 'full',
    data: { state: 'dump' },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
    initialNavigation: 'enabledNonBlocking',
    preloadingStrategy: Preload,
    onSameUrlNavigation: 'reload',
    enableTracing: false,
    scrollPositionRestoration: 'enabled',
    paramsInheritanceStrategy: 'always',
    malformedUriErrorHandler: (error: URIError, urlSerializer: UrlSerializer, url: string) => urlSerializer.parse('/')
}),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
