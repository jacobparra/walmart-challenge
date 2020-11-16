import {
  RequestHandler, Request, Response, NextFunction
} from 'express';
import BadRequest from '../errors/bad-request';
import logger from '../logger';

interface HandlerOptions {};

/**
 * This router wrapper catches any error from async await
 * and throws it to the default express error handler,
 * instead of crashing the app
 * @param handler Request handler to check for error
 */
export const relogRequestHandler = (
  handler: RequestHandler,
  options?: HandlerOptions,
): RequestHandler => async (
  req: Request, res: Response, next: NextFunction
) => handler(req, res, next).catch((err: Error) => {
  if (process.env.NODE_ENV === 'development') {
    logger.log({
      level: 'error',
      message: 'Error in request handler',
      error: err
    });
  }
  next(err);
});
export default relogRequestHandler;
