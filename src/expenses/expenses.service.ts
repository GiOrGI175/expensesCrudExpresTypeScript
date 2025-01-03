import { Request, Response } from 'express';
import { readFile, writeFile } from '../utils/utils';

type expenseType = {
  id: number;
  category: string;
  price: number;
};

const getAllExpenses = async (req: Request, res: Response): Promise<void> => {
  const expenses: expenseType[] = await readFile('expenses.json', true);
  res.json(expenses);
};

const createExpense = async (req: Request, res: Response): Promise<void> => {
  const { category, price } = req.body;

  const expenses: expenseType[] = await readFile('expenses.json', true);
  const lastId = expenses[expenses.length - 1]?.id || 0;
  const newExpense = {
    id: lastId + 1,
    category,
    price,
  };
  expenses.push(newExpense);
  await writeFile('expenses.json', expenses, true);
  res.status(201).json(newExpense);
};

const getExpenseById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const expenses: expenseType[] = await readFile('expenses.json', true);
  const expense = expenses.find((el) => el.id === id);
  if (!expense) {
    res.status(404).json({ message: 'user not found' });
    return;
  }
  res.json(expense);
};

const deleteExpenseByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);
  const expenses: expenseType[] = await readFile('expenses.json', true);
  const index = expenses.findIndex((el) => el.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'expenses not found' });
    return;
  }
  const deletedExpense = expenses.splice(index, 1);
  await writeFile('expenses.json', expenses, true);
  res.json(deletedExpense);
};

const updateExpenseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);
  const { category, price } = req.body;
  const expenses: expenseType[] = await readFile('expenses.json', true);
  const index = expenses.findIndex((el) => el.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'expenses not found' });
    return;
  }
  if (category) expenses[index].category = category;
  if (price) expenses[index].price = price;
  await writeFile('expenses.json', expenses, true);
  res.json(expenses[index]);
};

export {
  getAllExpenses,
  createExpense,
  deleteExpenseByID,
  getExpenseById,
  updateExpenseById,
};
