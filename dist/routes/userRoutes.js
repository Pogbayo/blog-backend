"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
;
const router = express_1.default.Router();
exports.userRoutes = router;
router.post("/users", userController_1.signup);
router.post("/users/login", userController_1.login);
router.get("/users", userController_1.getUsers);
