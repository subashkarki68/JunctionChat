export enum Status {
  'SUCCESS' = 'SUCCESS',
  'ERROR' = 'ERROR',
}

export interface ServerResponse {
  status: Status;
  message: string;
  details?: any;
}
