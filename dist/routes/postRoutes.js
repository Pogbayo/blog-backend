"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const router = express_1.default.Router();
exports.postRoutes = router;
router.post("/post", postController_1.createPost);
router.delete("/post", postController_1.deletePost);
router.get("/post", postController_1.getAllPosts);
