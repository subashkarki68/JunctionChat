export interface Error {
  status: number;
  error: string;
  message: string;
  details?: any;
}

export interface ValidationError extends Error {
  details: {
    field: string;
    message: string;
  }[];
}

export interface DatabaseError extends Error {
  details: {
    code: string;
    clientVersion: string;
    meta: { [key: string]: any };
  };
}

export interface GenericError extends Error {
  details?: any;
}
