import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentComponent } from './component.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { StringinputComponent } from './Stringinput/Stringinput.component';
import { BoolinputComponent } from './Boolinput/Boolinput.component';
import { DeginputComponent } from './Deginput/Deginput.component';
import { DegDropDownComponent } from './DegDropDown/DegDropDown.component';
import { TExtAreaComponent } from './TExtArea/TExtArea.component';
import { RadioInputComponent } from './RadioInput/RadioInput.component';
import { NgxHijriGregorianDatepickerModule } from 'ngx-hijri-gregorian-datepicker';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FilesdownloadComponent } from './filesdownload/filesdownload.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxHijriGregorianDatepickerModule,
  ],
  declarations: [
    ComponentComponent,
    StringinputComponent,
    BoolinputComponent,
    DeginputComponent,
    DegDropDownComponent,
    TExtAreaComponent,
    RadioInputComponent,
    CheckboxComponent,
    FilesdownloadComponent,
  ],
  providers: [],
  exports: [
    FilesdownloadComponent,
    NgxHijriGregorianDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    StringinputComponent,
    BoolinputComponent,
    DeginputComponent,
    DegDropDownComponent,
    TExtAreaComponent,
    RadioInputComponent,
    CheckboxComponent,
  ],
})
export class ComponentModule {}
