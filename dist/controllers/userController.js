"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = exports.getUsers = void 0;
const User_1 = require("../models/User");
const getUsers = async (req, res, next) => {
    try {
        const users = await User_1.User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ "error": error });
    }
};
exports.getUsers = getUsers;
const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json("User already exists");
        }
        const newUser = new User_1.User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.signup = signup;
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email or pasword" });
        }
        const isMatch = await user?.comparePassword(password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }
        res.json({ message: "Login successful" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.login = login;
