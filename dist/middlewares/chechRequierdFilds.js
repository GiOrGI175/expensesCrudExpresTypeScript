"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkRequiredFields = (req, res, next) => {
    const { category, price } = req.body;
    if (!category || !price || price < 0) {
        res.status(400).json({ message: 'Required all input' });
        return;
    }
    next();
};
exports.default = checkRequiredFields;
