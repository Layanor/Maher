export interface ModelStateError {
  Field: string;
  Message: string;
}

export interface ApiError {
  StatusCode: number;
  Message: string;
  IsError: boolean;
  Detail?: any;
  StackTrace?: any;
  Type?: any;
  ModelStateErrors: ModelStateError[];
  Id: number;
}
