import { Request } from "express";

export interface GraphQLContext{
  req:Request;
  user?:any
  // user?:{
  //   userId:string;
  //   iat?:number; // Issued at (Optional)
  //   exp?:number // Expiration (optin)
  // };
}