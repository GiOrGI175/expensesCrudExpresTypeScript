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
const updateForm = document.querySelector('form');
const id = location.pathname.split('/')[2];
if (updateForm) {
    updateForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const newExpense = {
            category: updateForm.category.value,
            price: updateForm.price.value,
        };
        const res = yield fetch(`http://localhost:3001/expenses/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newExpense),
        });
        if (res.status === 200) {
            updateForm.category.value = '';
            updateForm.price.value = '';
            setTimeout(() => {
                location.href = '/expense-list';
            }, 1000);
        }
    }));
}
