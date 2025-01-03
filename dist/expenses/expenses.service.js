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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExpenseById = exports.getExpenseById = exports.deleteExpenseByID = exports.createExpense = exports.getAllExpenses = void 0;
const utils_1 = require("../utils/utils");
const getAllExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expenses = yield (0, utils_1.readFile)('expenses.json', true);
    res.json(expenses);
});
exports.getAllExpenses = getAllExpenses;
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { category, price } = req.body;
    const expenses = yield (0, utils_1.readFile)('expenses.json', true);
    const lastId = ((_a = expenses[expenses.length - 1]) === null || _a === void 0 ? void 0 : _a.id) || 0;
    const newExpense = {
        id: lastId + 1,
        category,
        price,
    };
    expenses.push(newExpense);
    yield (0, utils_1.writeFile)('expenses.json', expenses, true);
    res.status(201).json(newExpense);
});
exports.createExpense = createExpense;
const getExpenseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const expenses = yield (0, utils_1.readFile)('expenses.json', true);
    const expense = expenses.find((el) => el.id === id);
    if (!expense) {
        res.status(404).json({ message: 'user not found' });
        return;
    }
    res.json(expense);
});
exports.getExpenseById = getExpenseById;
const deleteExpenseByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const expenses = yield (0, utils_1.readFile)('expenses.json', true);
    const index = expenses.findIndex((el) => el.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'expenses not found' });
        return;
    }
    const deletedExpense = expenses.splice(index, 1);
    yield (0, utils_1.writeFile)('expenses.json', expenses, true);
    res.json(deletedExpense);
});
exports.deleteExpenseByID = deleteExpenseByID;
const updateExpenseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { category, price } = req.body;
    const expenses = yield (0, utils_1.readFile)('expenses.json', true);
    const index = expenses.findIndex((el) => el.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'expenses not found' });
        return;
    }
    if (category)
        expenses[index].category = category;
    if (price)
        expenses[index].price = price;
    yield (0, utils_1.writeFile)('expenses.json', expenses, true);
    res.json(expenses[index]);
});
exports.updateExpenseById = updateExpenseById;
