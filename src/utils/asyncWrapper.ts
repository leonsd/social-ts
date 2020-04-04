import { Request, Response, NextFunction } from 'express';

export default (func: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res);
    }
    catch (err) {
      next(err);
    }
  };
};
