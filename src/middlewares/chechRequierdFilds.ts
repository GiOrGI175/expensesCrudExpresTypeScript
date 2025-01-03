import { Request, Response, NextFunction } from 'express';

const checkRequiredFields = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { category, price } = req.body;

  if (!category || !price || price < 0) {
    res.status(400).json({ message: 'Required all input' });
    return;
  }
  next();
};

export default checkRequiredFields;
