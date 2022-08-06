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
exports.getValidToken = exports.createToken = void 0;
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
const tokenSchema = new mongoose_1.Schema({
    createdAt: Date,
    active: Boolean,
    userId: { type: String, required: true },
});
const tokenModel = (0, mongoose_1.model)("Token", tokenSchema);
const createToken = (createdAt, active, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const token = new tokenModel({ userId, createdAt, active });
    //   token.createdAt = new Date();
    //   token.active = true;
    //   token.userId = userId;
    yield token.save();
    return token;
});
exports.createToken = createToken;
const getValidToken = (tokenId) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield tokenModel.findById(tokenId);
    // pode buscar por ID e ativo ou prazo de expiração
    if (!token)
        throw new Error("Token inválido");
    if (!token.active)
        throw new Error("Token inválido");
    const expireAt = (0, moment_1.default)(token.createdAt);
    expireAt.add(3, "d");
    if (expireAt < (0, moment_1.default)())
        throw new Error("Token inválido");
    return token;
});
exports.getValidToken = getValidToken;
//# sourceMappingURL=token.js.map