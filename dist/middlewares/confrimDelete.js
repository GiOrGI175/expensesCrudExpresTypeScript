"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const confrimDeleteMiddleware = (req, res, next) => {
    const confrimDelete = req.headers['confrim-delete'];
    if (confrimDelete !== 'yes') {
        res.status(403).json({ message: 'u cannot delete this' });
        return;
    }
    next();
};
exports.default = confrimDeleteMiddleware;
