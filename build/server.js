"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const server = (0, express_1.default)();
server.use((0, cors_1.default)({
    origin: "localhost",
    allowedHeaders: "localhost",
}));
server.use(express_1.default.json());
server.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
// deixa a pasta pública para GET
server.use("/images", express_1.default.static("images"));
// primeiro verifica login
server.use("/", routes_1.userRouter);
// server.use(authenticationMiddleware);
// server.use(authorizationMiddleware);
// Entidades (roteadores)
// A ordem das rotas são importantes
server.use("/locais", routes_1.climbRouter);
// server.use("/login", loginRouter);
server.use(middlewares_1.errorHandler);
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map