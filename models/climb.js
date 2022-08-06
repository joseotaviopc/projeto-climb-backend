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
exports.saveImageToClimbs = exports.updateClimb = exports.deleteClimb = exports.saveNewClimb = exports.searchAllClimbs = exports.searchOneClimb = exports.searchOneClimbById = void 0;
const mongoose_1 = require("mongoose");
const climbSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    local: { type: String, required: true },
    category: { type: String, required: true },
    graduation: { type: String, required: true },
    description: { type: String, required: true },
    conditions: { type: String, required: true },
    video_url: [String],
    photo_url: [String],
    croqui_url: [String],
    location: {
        long: Number,
        lat: Number,
    },
});
const ClimbModel = (0, mongoose_1.model)("LocalClimb", climbSchema);
const searchOneClimbById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield ClimbModel.findById({
            _id: id,
        });
        console.log("Local encontrado com sucesso");
        return resp;
    }
    catch (error) {
        console.log("Erro:", error);
        return error;
    }
});
exports.searchOneClimbById = searchOneClimbById;
const searchOneClimb = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield ClimbModel.findOne({
            name: name,
        });
        console.log("Local encontrado com sucesso", resp);
        return resp;
    }
    catch (error) {
        console.log("Erro:", error);
        return error;
    }
});
exports.searchOneClimb = searchOneClimb;
const searchAllClimbs = () => __awaiter(void 0, void 0, void 0, function* () {
    // await ClimbModel.find();
    try {
        const resp = yield ClimbModel.find();
        console.log("Locais encontrados");
        return resp;
    }
    catch (error) {
        console.log("Erro:", error);
        return error;
    }
});
exports.searchAllClimbs = searchAllClimbs;
const saveNewClimb = (name, local, category, graduation, description, conditions) => __awaiter(void 0, void 0, void 0, function* () {
    const newClimbModel = new ClimbModel({
        name,
        local,
        category,
        graduation,
        description,
        conditions,
    });
    try {
        yield newClimbModel.save();
        console.log("Salvo com sucesso");
    }
    catch (error) {
        console.log("Erro:", error);
        return error;
    }
});
exports.saveNewClimb = saveNewClimb;
const deleteClimb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ClimbModel.findByIdAndDelete({
            _id: id,
        });
        console.log("Local deletado");
    }
    catch (error) {
        console.log("Erro:", error);
        return error;
    }
});
exports.deleteClimb = deleteClimb;
const updateClimb = (local) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ClimbModel.updateOne({
            local,
        });
        console.log("Local atualizado");
    }
    catch (error) {
        console.log("Erro:", error);
        return error;
    }
});
exports.updateClimb = updateClimb;
const saveImageToClimbs = (id, path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const climb = yield ClimbModel.findById(id);
        if (climb) {
            climb.photo_url.push(path);
            return yield climb.save();
        }
        console.log("Id não encontrado");
    }
    catch (error) {
        console.log("Erro:", error);
        return error;
    }
});
exports.saveImageToClimbs = saveImageToClimbs;
// envia via From ou Form-encoded, no thunder Client (file)
