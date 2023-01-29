
import { IdtypeResolver } from './admincall937/idtype/idtypeResolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuderRoutingModule } from './muderRoutingModule';
import { MuderComponent } from './muder/muder.component';
import { GrideModule } from '../Gride/Gride.module';
import { MdResolver } from './md/MdResolver.service';
import { MuderNavMenuComponent } from './muder-nav-menu/muder-nav-menu.component';

import { HospUsersComponent } from './hospusers/hospusers.component';
import { HospUsersResolver } from './hospusers/HospUsersResolver';

import { ModalModule } from 'ngx-bootstrap/modal';
import { UsersaddComponent } from './hospusers/usersadd/usersadd.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsereditComponent } from './hospusers/useredit/useredit.component';
import { UserdeleteComponent } from './hospusers/userdelete/userdelete.component';
import { DirComponent } from './dir/dir.component';
import { CompareValidatorDirective } from '../classes/compare-validator.directive';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MdService } from './md/Md.Service';
import { DirService } from './dir/dir.service';
import { UsersService } from './hospusers/Users.service';

import { BasedataComponent } from './basedata/basedata.component';
import { IdtypeComponent } from './admincall937/idtype/idtype.component';
import { MdComponent } from './md/md.component';
import { ClassroomComponent } from './classrom/data.component';
import { ClassroomResolver } from './classrom/dataResolver';
import { edumaterialComponent } from './edumaterial/data.component';
import { edumaterialResolver } from './edumaterial/dataResolver';
import { SchoolsComponent } from './schools/schools.component';
import { evaluationResolver } from './evaluation/dataResolver';
import { evaluationComponent } from './evaluation/data.component';
import { NgxHijriGregorianDatepickerModule } from 'ngx-hijri-gregorian-datepicker';
import { ComponentModule } from '../../app/component/component.module';


@NgModule({
    declarations: [
        MuderComponent,
        evaluationComponent,
        DirComponent,
        CompareValidatorDirective,
        MuderNavMenuComponent,
        HospUsersComponent,
        UsersaddComponent,
        UsereditComponent,
        UserdeleteComponent,
        BasedataComponent,
        ClassroomComponent,
        edumaterialComponent,
        IdtypeComponent,
        MdComponent,
        SchoolsComponent,
    ],
    imports: [
      NgxHijriGregorianDatepickerModule,
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule,
        CommonModule,
        ComponentModule,
        ModalModule.forRoot(),
        GrideModule.forRoot(),
        MDBBootstrapModule.forRoot(),
        MuderRoutingModule,
    ],
    providers: [
      evaluationResolver,
      ClassroomResolver,
      edumaterialResolver,
        IdtypeResolver,
        MdResolver,
        HospUsersResolver,
        DirService,
        UsersService,
        MdService,
    ]
})
export class MuderModule {}
