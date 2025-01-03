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
exports.writeFile = exports.readFile = void 0;
const fs_1 = require("fs");
const readFile = (filePath, isParsed) => __awaiter(void 0, void 0, void 0, function* () {
    if (!filePath)
        return null;
    const readData = yield fs_1.promises.readFile(filePath, 'utf-8');
    return isParsed ? JSON.parse(readData) : readData;
});
exports.readFile = readFile;
const writeFile = (filePath, data, isStringify) => __awaiter(void 0, void 0, void 0, function* () {
    if (!filePath || !data)
        return null;
    yield fs_1.promises.writeFile(filePath, isStringify ? JSON.stringify(data) : data);
    console.log('writed successfully');
});
exports.writeFile = writeFile;
