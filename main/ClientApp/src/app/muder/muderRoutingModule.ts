
import { MdComponent } from './md/md.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminAuthorizeGuard } from '../../api-authorization/AuthoGuard/admin.authorize.guard';
import { MuderComponent } from './muder/muder.component';
import { MdResolver } from './md/MdResolver.service';
import { HospUsersComponent } from './hospusers/hospusers.component';
import { HospUsersResolver } from './hospusers/HospUsersResolver';
import { ClassroomComponent } from './classrom/data.component';
import { ClassroomResolver } from './classrom/dataResolver';
import { edumaterialComponent } from './edumaterial/data.component';
import { edumaterialResolver } from './edumaterial/dataResolver';
import { SchoolsComponent } from './schools/schools.component';
import { evaluationComponent } from './evaluation/data.component';
import { evaluationResolver } from './evaluation/dataResolver';

const muderROUTES: Routes = [
  {
    path: '',
    component: MuderComponent,
    canActivate: [AdminAuthorizeGuard],
    pathMatch: 'full',
    data: { preload: false, state: 'muderhome' },
  },
  {
    path: 'md',
    pathMatch: 'full',
    component: MdComponent,
    canActivate: [AdminAuthorizeGuard],
    data: { preload: false, state: 'medicalcenter' },
    resolve: { MedicalcenterandType: MdResolver },
  },

  {
    path: 'hospusers/:id',
    component: HospUsersComponent,
    // outlet: 'muderoutlet',
    pathMatch: 'full',
    canActivate: [AdminAuthorizeGuard],
    data: { preload: false, state: 'hospusers' },
    resolve: { UsersModel: HospUsersResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'schools',
    component: SchoolsComponent,
    // outlet: 'muderoutlet',
    pathMatch: 'full',
    canActivate: [AdminAuthorizeGuard],
    data: { preload: false, state: 'shools' },
   // resolve: { data: ClassroomResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'evaluation',
    component: evaluationComponent,
    // outlet: 'muderoutlet',
    pathMatch: 'full',
    canActivate: [AdminAuthorizeGuard],
    data: { preload: false, state: 'evaluation' },
    resolve: { data: evaluationResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'classroom',
    component: ClassroomComponent,
    // outlet: 'muderoutlet',
    pathMatch: 'full',
    canActivate: [AdminAuthorizeGuard],
    data: { preload: false, state: 'ClassroomResolver' },
    resolve: { data: ClassroomResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'edumaterial',
    component: edumaterialComponent,
    // outlet: 'muderoutlet',
    pathMatch: 'full',
    canActivate: [AdminAuthorizeGuard],
    data: { preload: false, state: 'edumatir' },
    resolve: { data: edumaterialResolver },
    runGuardsAndResolvers: 'always',
  },


  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(muderROUTES)],
  exports: [RouterModule],
})
export class MuderRoutingModule {}
