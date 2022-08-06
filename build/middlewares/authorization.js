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
const authorization_1 = require("../services/authorization");
const basicPaths = ["products", "cart", "list"];
const authorizationMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenId = req.headers["Authorization"];
    const user = yield (0, authorization_1.getClimberByTokenId)(tokenId);
    // switch (user?.role) {
    //   case "basic":
    //     if (!basicPaths.find(req.path)) {
    //       res.status(403).send("Unauthorized");
    //       return;
    //     }
    // }
    next();
});
exports.default = authorizationMiddleware;
//# sourceMappingURL=authorization.js.map