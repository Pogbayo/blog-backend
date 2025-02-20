import express from "express";
import { signup,login, getUsers } from "../controllers/userController";;

const router = express.Router();
router.post("/users",signup);
router.post("/users/login",login);
router.get("/users",getUsers)

export {router as userRoutes};