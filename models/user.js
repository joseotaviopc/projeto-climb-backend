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
exports.deleteClimber = exports.updateClimber = exports.getClimberByEmail = exports.createNewClimber = exports.searchOneClimber = exports.searchAllClimbers = void 0;
const mongoose_1 = require("mongoose");
const climberSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    hash: { type: String },
    role: { type: String, required: true },
});
const ClimberModel = (0, mongoose_1.model)("Climber", climberSchema);
const searchAllClimbers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ClimberModel.find();
    }
    catch (error) {
        console.log("Erro:", error);
        return error;
    }
});
exports.searchAllClimbers = searchAllClimbers;
const searchOneClimber = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ClimberModel.find({
            email: email,
        });
    }
    catch (error) {
        console.log("Erro ao encontrar climber:", error);
        return error;
    }
});
exports.searchOneClimber = searchOneClimber;
const createNewClimber = (email, password, name, lastName, hash, role) => __awaiter(void 0, void 0, void 0, function* () {
    const climber = yield (0, exports.getClimberByEmail)(email);
    if (climber) {
        throw new Error("Climber já existe");
    }
    const newClimber = new ClimberModel({ email, password, name, lastName, hash, role });
    try {
        yield newClimber.save();
        console.log("Climber criado com sucesso!");
        return newClimber;
    }
    catch (error) {
        console.log("Erro ao criar climber:", error);
        return error;
    }
});
exports.createNewClimber = createNewClimber;
const getClimberByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const climber = yield ClimberModel.find({
        email: email,
    });
    return climber;
    // retorna o user, verifica fora
});
exports.getClimberByEmail = getClimberByEmail;
const updateClimber = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ClimberModel.updateOne({
            email,
        });
    }
    catch (error) {
        console.log("Erro ao atualizar climber:", error);
        return error;
    }
});
exports.updateClimber = updateClimber;
const deleteClimber = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ClimberModel.findOne({
            email,
        });
    }
    catch (error) {
        console.log("Erro ao deletar climber:", error);
        return error;
    }
});
exports.deleteClimber = deleteClimber;
