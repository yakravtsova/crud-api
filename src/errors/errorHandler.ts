import { ServerResponse } from "http";
import { CustomError } from "../types/types";
import { ERROR_MESSAGES, RESPONSE_STATUS_CODES } from "../utils/constants";

export const errorHandler = (err: CustomError | Error, res: ServerResponse) => {
  res.statusCode = ("statusCode" in err) ? err.statusCode : RESPONSE_STATUS_CODES.INTERNAL_SERVER_ERROR;
  res.end(JSON.stringify({message: err.message ? err.message : ERROR_MESSAGES.INTERNAL_SERVER_ERROR}))
};
