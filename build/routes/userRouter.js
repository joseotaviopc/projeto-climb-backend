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
const express_1 = require("express");
const user_1 = require("../models/user");
const userDTO_1 = __importDefault(require("../views/userDTO"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRouter = (0, express_1.Router)();
// cria um salt com uma palavra aleatória de 15 caracteres
const SALT = 15;
userRouter.get("/", (req, res) => {
    // const email = req.body;
    // if (!email) {
    //   return res.status(400).send("Climber não foram enviado.");
    // }
    // const climber = searchOneClimber(email);
    // res.status(200).send(climber);
    (0, user_1.searchAllClimbers)().then((doc) => {
        res.status(200);
        res.json(doc);
    });
});
// New climber
userRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, lastName, role } = req.body;
    const hash = bcrypt_1.default.hashSync(password, SALT);
    if (!email || !password || !name || !lastName) {
        res.status(400).send("Alguns dados obrigatórios não foram preenchidos.");
    }
    const newClimber = yield (0, user_1.createNewClimber)(email, password, name, lastName, hash, role);
    res.status(201).json(new userDTO_1.default(newClimber));
}));
// login
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const climber = yield (0, user_1.getClimberByEmail)(email);
    if (!climber) {
        res.status(403).send("Não encontrado");
        return;
    }
    // if (!bcrypt.compareSync(password, climber.password)) {
    //   res.status(403).send("Email ou senha inválidos");
    //   return;
    // }
    // const token = await createToken(new Date(), true, climber.id);
    res.status(201).send("new tokenDTO(token)");
}));
// logout
userRouter.post("/logoff", (req, res) => {
    res.status(200).send(`<h2>Usuário apagado</h2>`);
});
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map