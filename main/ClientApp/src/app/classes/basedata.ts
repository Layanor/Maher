export const allcalltype = ['active','closedby', 'closed'];

export interface BaseData {
  value: number;
  text: string;
}
export interface Medwithclinic {
  value: number;
  text: string;
  clinic: Clinic[] | null;
}

export interface Clinic {
  value: number;
  MedicalCenterId: number;
  text: string;
}
export interface actionandby {
  Count: number;
  Steps: string;
}
export interface actionuser {
  taklist: actionandby[]
  username: string
}
export interface actionbyall {
  dir: actionuser[];
  hosp: actionuser[];
  clinic: actionuser[];
  other: actionuser[];
  msg: string;
  count: number;
}
export interface UserCompType {
  Name: string;
  value: number;
  text?: string;
}
