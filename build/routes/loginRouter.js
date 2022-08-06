"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginRouter = (0, express_1.Router)();
loginRouter.get("/", (req, res) => {
    const { email, password } = req.body;
    try {
    }
    catch (error) { }
    res.status(200).send(`<h2>Status OK</h2>`);
});
loginRouter.post("/", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401).send(`
      <h2>Dados inválidos</h2>
    `);
    }
    res.status(200).send(`<h2>Logado</h2>`);
});
loginRouter.put("/", (req, res) => {
    res.status(200).send(`<h2>Dados alterados</h2>`);
});
loginRouter.get("/", (req, res) => {
    res.status(200).send(`<h2>Usuário apagado</h2>`);
});
exports.default = loginRouter;
//# sourceMappingURL=loginRouter.js.map