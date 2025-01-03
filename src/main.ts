import express, { Express, Request, Response } from 'express';
import expenseRouter from './expenses/expenses.router';
import { readFile, writeFile } from './utils/utils';

type expenseType = {
  id: number;
  category: string;
  price: number;
};

const app: Express = express();

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/expenses', expenseRouter);

//! typeScript Error-ი არ არი მარა ბრაუზერში რო ვხსნი არ გადადის გვერდებზე ვერ გავიგე რისი ბრალია სავარაუდოდ დამისამრთრბის მგონია src სჰი რო ჩავაგდე ალბათ ამ viwes ვეღარ ხედავს მეინდერექტოირათ რო იქ მოძებნოსთქო

app.get('/expense-list', async (req: Request, res: Response) => {
  const expenses = await readFile('expenses.json', true);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedExpenses = expenses.slice(startIndex, endIndex);

  res.render('pages/expensesList.ejs', {
    expenses: paginatedExpenses,
    page: page,
    limit: limit,
    totalItems: expenses.length,
    totalPages: Math.ceil(expenses.length / limit),
  });
});

app.get('/expense-list/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const expenses = await readFile('expenses.json', true);
  const expense = expenses.find((el: expenseType) => el.id === id);
  res.render('pages/expenseDetails.ejs', { expense });
});

app.get('/create-expense', (req: Request, res: Response) => {
  res.render('pages/expensesCreate.ejs');
});

app.get('/expense-update/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const expenses = await readFile('expenses.json', true);
  const expense = expenses.find((el: expenseType) => el.id === id);
  res.render('pages/expenseUpdate.ejs', { expense });
});

app.get('/', (req: Request, res: Response) => {
  res.send('hellow world');
});

app.listen(3001, () => {
  console.log('server runnig on http://localhost:3001');
});
