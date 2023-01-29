import { EmailValidator } from '@angular/forms';
import { PasswordValidation } from './PasswordValidation';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';
export class Directorate {
  Id: number;
  Name: string;
  ShortName: string;
}
export class Boolenvals {
  value: boolean;
  viewValue: string;
}
export interface vals {
  value: number;
  viewValue: string;
}
export interface Stringvals {
  value: string;
  viewValue: string;
}
export class Hospdirtour {
  hospDirTourStart: {
    id: number;
    startDateTime: string;
    by: string;
    medicalCenterName: string;
    persent: number;
  };

  deps1: number;
  deps2: number;
  deps3: number;
  deps4: number;
  deps5: number;
  deps6: number;
  deps7: number;
  deps8: number;
  deps9: number;
  deps10: number;
  degreedeps1: number;
  degreedeps2: number;
  degreedeps3: number;
  degreedeps4: number;
  degreedeps5: number;
  degreedeps6: number;
  degreedeps7: number;
  degreedeps8: number;
  degreedeps9: number;
  degreedeps10: number;
}
export class deps {
  id: number;
  ind1: any;
  nind1: string;
  ind2: any;
  nind2: string;
  ind3: any;
  nind3: string;
  ind4: any;
  nind4: string;
  ind5: any;
  nind5: string;
  ind6: any;
  nind6: string;
  ind7: any;
  nind7: string;
  ind8: any;
  nind8: string;
  ind9: any;
  nind9: string;
  ind10: any;
  nind10: string;
  ind11: any;
  nind11: string;
  ind12: any;
  nind12: string;
  ind13: any;
  nind13: string;
  ind14: any;
  nind14: string;
  ind15: any;
  nind15: string;
  ind16: any;
  nind16: string;
  ind17: any;
  nind17: string;
  ind18: any;
  nind18: string;
  ind19: any;
  nind19: string;
  ind20: any;
  nind20: string;
}
export class Roles {
  constructor(name?: string, description?: string, id?: string) {
    this.name = name;
    this.description = description;
    this.id = id;
  }

  public id: string;
  public name: string;
  public description: string;
  public usersCount: number;
}
export class HospDirTourStartViewModel {
  id: number;
  StartDateTime: Date;
  by: string;
  medicalCenterName: string;
  iscomplate: boolean;
  persent: number;
}

export class ChartViewModel {
  id: number;
  MedicalCenterId: number;
  startDateTime: Date;
  by: string;
  medicalCenterName: string;
  percent: number;
}
export class VisualtrViewModel {
  id: number;
  MedicalCenterId: number;
  startDateTime: Date;
  by: string;
  medicalCenterName: string;
  iscomplate: boolean;
  persent: number;
  ind1: boolean;
  nind1: string;
  ind2: boolean;
  nind2: string;
  ind3: boolean;
  nind3: string;
  ind4: boolean;
  nind4: string;
  ind5: boolean;
  nind5: string;
  ind6: boolean;
  nind6: string;
  ind7: boolean;
  nind7: string;
  ind8: boolean;
  nind8: string;
  ind9: boolean;
  nind9: string;
  ind10: boolean;
  nind10: string;
  ind11: boolean;
  nind11: string;
  ind12: number;
  nind12: string;
  ind13: number;
  nind13: string;
  ind14: number;
  nind14: string;
  ind15: number;
  nind15: string;
  ind16: number;
  nind16: string;
  ind17: number;
  nind17: string;
  ind18: number;
  nind18: string;
  ind19: number;
  nind19: string;
  ind20: number;
  nind20: string;
  ind21: number;
  nind21: string;
  note: string;
  percent: number;
}
export class Users {
  username: string;
  email: EmailValidator;
  emailConfirmed: boolean;
  Password: PasswordValidation;
  ConfirmPassword: PasswordValidation;
  FullName: string;
  isEnabled: boolean;
  id: string;
  isLockedOut: boolean;
  roles: string[];
  directorateid: number;
  md: MedicalCenter[];
  cilinic: MedicalCenter[];
}
export class EditUsers {
  username: string;
  Email: EmailValidator;
  emailConfirmed: boolean;
  FullName: string;
  isEnabled: boolean;
  Id: string;
  isLockedOut: boolean;
  directorateid: number;
  md: hf[];
  cilinic: hf[];
  usertype: hf[];
  istmara: hf[];
  usercomptype: hf[];
}
export class MedicalCenter {
  Id: number;
  Name: string;
  ShortName: string;
  Email: string;
  directorateId: number;
  MedCenterTypesId: number;
  MedicalCenterId: number;
}
export class clinic {
  Id: number;
  Name: string;
  ShortName: string;
  Email: string;
  DirectorateId: number;
  MedCenterTypesId: number;
  MedicalCenterId: number;
}
export class hf {
  value: number;
  text: string;
}
export class MedCenterType {
  MedCenterTypesId: number;
  Name: string;
}
export class MedCenterdrop {
  id: number;
  name: string;
}
export class Md {
  MedicalCenterId: number;
  name: string;
}
export class MahgerType {
  mid: number;
  name: string;
}
export class UserTypes {
  Id: number;
  name: string;
}
export class CompTypes {
  Id: number;
    Name: string;
  value: number;
}
export class MedicalcenterandType {
  medicalCenters: MedicalCenter[];
  medCenterTypes: MedCenterType[];
  clinic: clinic[];
}
export class UsersModel {
  id: string;
  FullName: string;
  email: string;
  rolesDes: string[];
  directorates: Directorate[];
  medicalCenters: string[];
  usertypename: string;
  useristmaraname: string;
  // "uType": 0,

  // "assistants": null,
  // "supervisors": null,

  // "mainInds": null,
}
export class Clinic {
  Id: number;
  Name: string;
  ShortName: string;
  Email: string;
  DirectorateId: number;
  MedCenterTypesId: number;
}
export interface IMenuItemModelChild extends MenuItemModel {
  path?: string; // This is for your path
  query?: string; // This is for your optional query param, add more query properties if you need them
  items?: IMenuItemModelChild[]; // We over write the exiting items property of the parent
}
