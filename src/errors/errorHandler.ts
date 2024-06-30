import { ServerResponse } from "http";
import { CustomError } from "../types/types";

export const errorHandler = (err: CustomError | Error, res: ServerResponse) => {
  res.statusCode = ("statusCode" in err) ? err.statusCode : 500;
  res.end(JSON.stringify({message: err.message ? err.message : "Internal server error"}))
};
