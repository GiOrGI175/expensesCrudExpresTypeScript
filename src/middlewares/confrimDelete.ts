import { Request, Response, NextFunction } from 'express';

const confrimDeleteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const confrimDelete = req.headers['confrim-delete'];

  if (confrimDelete !== 'yes') {
    res.status(403).json({ message: 'u cannot delete this' });
    return;
  }
  next();
};

export default confrimDeleteMiddleware;
