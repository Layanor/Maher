

export interface ComptypeViewModel {
  Count: number;
  Name: string;
  Closed: number;
  Underproc: number;
  New: number;
  Closedpersent : number;
  Closedtime:any
}

export interface TypeOfComplain {
  Count: number;
  Name: string;
  Closed: number;
  Underproc: number;
  New: number;
  Closedpersent : number;
  Closedtime:any
}

export interface Med {
  Count: number;
  Name: string;
  Closed: number;
  Underproc: number;
  New: number;
  Closedpersent : number;
  Closedtime:any
}

export interface Clinic {
  Count: number;
  Name: string;
  Closedpersent : number;
  Closedtime:any;
  Closed: number;
  Underproc: number;
  New: number;
}

export interface Stat {
  All: number;
  Closed: number;
  Underproc: number;
  New: number;
  ComptypeViewModels: ComptypeViewModel[];
  typeOfComplain: TypeOfComplain[];
  Med: Med[];
  Clinic: Clinic[];
  msg: string;
  Closedpersent : number;
  Closedtime:any;
  typeOfComplain2 :any;
  AllClinic:any
  AllMed:any
}
export interface AllStat {
  All: number;
  Closed: number;
  Underproc: number;
  New: number;
  ComptypeViewModels: ComptypeViewModel[];
  typeOfComplain: ComptypeViewModel[];
  Med: ComptypeViewModel[] | null;
  Clinic: ComptypeViewModel[] | null;
  msg: string;
  AllMed: AllStat[] | null;
  AllClinic: AllStat[] | null;
}




