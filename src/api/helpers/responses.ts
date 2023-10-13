import { NextFunction, Request, Response } from "express";

interface customeResponse extends Response {
  // customeJson: Function;
  respond: Function;
  fail: Function;
  respondCreated: Function;
  respondRead: Function;
  respondUpdated: Function;
  respondDeleted: Function;
  respondNoContent: Function;
  failUnauthorized: Function;
  failForbidden: Function;
  failNotFound: Function;
  failValidationError: Function;
  failResourceExists: Function;
  failResourceGone: Function;
  failTooManyRequests: Function;
  failServerError: Function;
}

const responseCodes = {
  created: 201,
  read: 200,
  updated: 200,
  deleted: 200,
  no_content: 204,
  invalid_request: 400,
  unsupported_response_type: 400,
  invalid_scope: 400,
  invalid_grant: 400,
  invalid_credentials: 400,
  invalid_refresh: 400,
  no_data: 400,
  invalid_data: 400,
  access_denied: 401,
  unauthorized: 401,
  invalid_client: 401,
  forbidden: 403,
  resource_not_found: 404,
  not_acceptable: 406,
  resource_exists: 409,
  conflict: 409,
  resource_gone: 410,
  payload_too_large: 413,
  unsupported_media_type: 415,
  too_many_requests: 429,
  server_error: 500,
  unsupported_grant_type: 501,
  not_implemented: 501,
  temporarily_unavailable: 503,
};

const responseHelper = (req: Request, res: customeResponse, next: NextFunction = null) => {
  // For pure NodeJS support.
  // if (res.json === undefined) {
  //   res.customeJson = (data: any) => {
  //     res.setHeader('content-type', 'application/json');
  //     res.end(JSON.stringify(data));
  //   };
  // }

  res.respond = (data: any = null, status: number = 200, message: string = '') => {
    res.statusCode = status;
    if (data === null)
      res.end(message);
    else
      res.json(data);
  };

  res.fail = (messages: any, status: number = 400, code: any = null) => {
    const response = {
      status: status,
      error: code || status.toString(),
      messages: messages
    };

    res.respond(response, status);
  };

  res.respondCreated = (data: any = null, message: string = '') => {
    res.respond(data, responseCodes.created, message);
  };

  res.respondRead = (data: any = null, message: string = '') => {
    res.respond(data, responseCodes.read, message);
  };

  res.respondUpdated = (data: any = null, message: string = '') => {
    res.respond(data, responseCodes.updated, message);
  };
  
  res.respondDeleted = (data: any = null, message: string = '') => {
    res.respond(data, responseCodes.deleted, message);
  };

  res.respondNoContent = () => {
    res.respond(null, responseCodes.no_content);
  };

  res.failUnauthorized = (description: string = 'Unauthorized', code: any = null) => {
    res.fail(description, responseCodes.unauthorized, code);
  };

  res.failForbidden = (description: string = 'Forbidden', code: any = null) => {
    res.fail(description, responseCodes.forbidden, code);
  };

  res.failNotFound = (description: string = 'Not Found', code: any = null) => {
    res.fail(description, responseCodes.resource_not_found, code);
  };

  res.failValidationError = (description: string = 'Bad Request', code: any = null) => {
    res.fail(description, responseCodes.invalid_data, code);
  };

  res.failResourceExists = (description: string = 'Conflict', code: any = null) => {
    res.fail(description, responseCodes.resource_exists, code);
  };

  res.failResourceGone = (description: string = 'Gone', code: any = null) => {
    res.fail(description, responseCodes.resource_gone, code);
  };

  res.failTooManyRequests = (description: string = 'Too Many Requests', code: any = null) => {
    res.fail(description, responseCodes.too_many_requests, code);
  };

  res.failServerError = (description: string = 'Internal Server Error', code: any = null) => {
    res.fail(description, responseCodes.server_error, code);
  };

  if (next !== null)
    next();
};

export default {
  helper: () => responseHelper,
  responseCodes: responseCodes,
};