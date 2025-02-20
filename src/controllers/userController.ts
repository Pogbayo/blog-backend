import {User} from "../models/User";
import { NextFunction, Request, Response } from "express";


export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({"error": error})
 }
}


export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {name,email,password} = req.body;
  
    try {
      const existingUser = await User.findOne({email})
  
      if (existingUser) {
          res.status(400).json("User already exists")
      }
      
      const newUser =  new User({name,email,password})
      await newUser.save();

      res.status(201).json({message:"User registered successfully"})
    } catch (error) {
      res.status(400).json({error: (error as Error).message})
      console.log(error)
    }
  }


export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {email,password} = req.body;
    
    try {
        const user = await User.findOne({email});
        if (!user) {
            res.status(400).json({message:"Invalid email or pasword"})
        }

      const isMatch = await user?.comparePassword(password);

      if (!isMatch) {
        throw new Error("Invalid credentials")
       }

      res.json({message:"Login successful"});

    } catch (error) {
        res.status(400).json({error: (error as Error).message})
        console.log(error)
    }
}
