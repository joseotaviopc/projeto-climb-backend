"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dberro_1 = __importDefault(require("../errors/dberro"));
const errorHandler = (error, req, res, next) => {
    if (error instanceof dberro_1.default) {
        res.status(400).send("Bad request");
    }
    else if (error) {
        next(error);
    }
    else {
        next();
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map