import { Router } from 'express';

import {
  getAllExpenses,
  createExpense,
  deleteExpenseByID,
  getExpenseById,
  updateExpenseById,
} from './expenses.service';

import confrimDeleteMiddleware from '../middlewares/confrimDelete';
import checkRequiredFields from '../middlewares/chechRequierdFilds';

const expensesRouter = Router();

expensesRouter.get('/', getAllExpenses);
expensesRouter.get('/:id', getExpenseById);
expensesRouter.post('/', checkRequiredFields, createExpense);
expensesRouter.delete('/:id', confrimDeleteMiddleware, deleteExpenseByID);
expensesRouter.put('/:id', updateExpenseById);

export default expensesRouter;
