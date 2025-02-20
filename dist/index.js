"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = require("./routes/userRoutes");
const postRoutes_1 = require("./routes/postRoutes");
const commentRoutes_1 = require("./routes/commentRoutes");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, db_1.default)();
app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use("/api", userRoutes_1.userRoutes);
app.use("/api", postRoutes_1.postRoutes);
app.use("/api", commentRoutes_1.commentRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
