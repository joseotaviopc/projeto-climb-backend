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
const express_1 = require("express");
const uuid_1 = require("uuid");
const climb_1 = require("../models/climb");
const climbRouter = (0, express_1.Router)();
// CRUD - Read
// === Tratar erros: erro no banco(500), sem conteúdo(204), ok(200) ?
climbRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const searchById = yield (0, climb_1.searchOneClimbById)(id);
    if (res.statusCode === 404) {
        return res.json("Não encontrado");
    }
    res.status(200).send(searchById);
}));
climbRouter.get("/:query", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.params.query;
    const searchQuery = yield (0, climb_1.searchOneClimb)(query);
    if (res.statusCode === 404) {
        return res.json("Não encontrado");
    }
    res.status(200).send(searchQuery);
}));
// === Tratar erros: erro no banco(500), sem conteúdo(204), ok(200) ?
climbRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allLocals = yield (0, climb_1.searchAllClimbs)();
    if (res.statusCode === 404) {
        return res.json("Não encontrado");
    }
    res.status(200).send(allLocals);
}));
// CRUD - Create
climbRouter.post("/", (req, res) => {
    const newLocal = Object.assign({}, req.body);
    if (!newLocal.name ||
        !newLocal.local ||
        !newLocal.category ||
        !newLocal.graduation ||
        !newLocal.description ||
        !newLocal.conditions) {
        return res
            .status(400)
            .send("Alguns dados obrigatórios não foram preenchidos.");
    }
    const { name, local, category, graduation, description, conditions } = req.body;
    (0, climb_1.saveNewClimb)(name, local, category, graduation, description, conditions);
    res.status(201).send(newLocal);
});
// CRUD - Update
climbRouter.put("/:id", (req, res) => {
    const id = req.params.id;
    const eraseClimb = (0, climb_1.deleteClimb)(id);
    res.status(201).json(eraseClimb);
});
climbRouter.post("/:id/image", (req, res) => {
    if (!req.files) {
        res.status(400).send("Arquivo não enviado");
        return;
    }
    // var imageAsBase64 = fs.readFileSync("./your-image.png", "base64");
    const fileId = (0, uuid_1.v4)();
    const projectPath = `C:/Users/carva/Documents/Degree/modulo-11/aula-01`;
    const sampleFile = req.files.thumbnail;
    const uploadPath = `${projectPath}/images/climbs/${fileId}`;
    sampleFile.mv(uploadPath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("deu erro");
            return;
        }
        (0, climb_1.saveImageToClimbs)(req.params.id, uploadPath);
        res.status(201).send("Imagem enviada");
    });
});
// CRUD - Delete (deletar images)
climbRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const climb = yield (0, climb_1.searchOneClimbById)(id);
    // if (climb && climb.photo_url) {
    // }
    const eraseClimb = (0, climb_1.deleteClimb)(id);
    if (res.statusCode === 404) {
        return res.json("Não encontrado");
    }
    res.status(200).json(eraseClimb);
}));
exports.default = climbRouter;
//# sourceMappingURL=climbRouter.js.map