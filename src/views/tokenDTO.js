"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
// moment.js => trabalhar com datas
class tokenDTO {
    constructor({ _id, createdAt }) {
        const expireAt = (0, moment_1.default)(createdAt);
        expireAt.add(3, "d");
        this.token = _id;
        this.expireAt = expireAt.toDate();
    }
}
exports.default = tokenDTO;
