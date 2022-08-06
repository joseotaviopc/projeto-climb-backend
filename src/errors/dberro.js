"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DBError extends Error {
    constructor(message) {
        super(`${message}`);
        this.name = 'CustomError';
    }
}
;
exports.default = DBError;
