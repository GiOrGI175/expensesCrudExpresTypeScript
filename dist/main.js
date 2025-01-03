"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenses_router_1 = __importDefault(require("./expenses/expenses.router"));
const utils_1 = require("./utils/utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.set('view engine', 'ejs');
app.use('/expenses', expenses_router_1.default);
app.get('/expense-list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expenses = yield (0, utils_1.readFile)('expenses.json', true);
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
}));
app.get('/expense-list/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const expenses = yield (0, utils_1.readFile)('expenses.json', true);
    const expense = expenses.find((el) => el.id === id);
    res.render('pages/expenseDetails.ejs', { expense });
}));
app.get('/create-expense', (req, res) => {
    res.render('pages/expensesCreate.ejs');
});
app.get('/expense-update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const expenses = yield (0, utils_1.readFile)('expenses.json', true);
    const expense = expenses.find((el) => el.id === id);
    res.render('pages/expenseUpdate.ejs', { expense });
}));
app.get('/', (req, res) => {
    res.send('hellow world');
});
app.listen(3001, () => {
    console.log('server runnig on http://localhost:3001');
});
