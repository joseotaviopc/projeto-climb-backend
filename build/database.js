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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URL = String(process.env.MONGO_URL);
const connect = (tries = 1) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGO_URL);
        console.log("Conectado ao banco");
    }
    catch (e) {
        console.error("Sem conexão com o banco", e);
        setTimeout(() => connect(tries + 1), 3000 ** tries);
        // "Backoff" tenta várias vezes se conectar
    }
});
connect();
// Definindo um modelo Cat em forma de objeto
// const Cat = mongoose.model("Cat", { name: String });
// cria uma instância do modelo Cat
// const kitty = new Cat({ name: "Zildjian" });
// salva a instancia e faz um console
// kitty.save().then(() => console.log("meow"));
//# sourceMappingURL=database.js.map