import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

// /api/users/register

router.post("/register", [
    // this is the middle ware which checks the following are string. It will find every errors and attach it to request req.
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({min:6,}),

], async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({message: errors.array()});
        }
        // Check if email property exists in the request body
        if (!req.body || !req.body.email) {
            return res.status(400).json({ message: "Email is required in the request body" });
        }

        // Find user by email
        let user = await User.findOne({
            email: req.body.email,
        });

        // If the user with the same email already exists
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user instance
        user = new User(req.body);

        // Save user info to the database
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d"
        });

        // Set token in cookie
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000, // 1 day in milliseconds
        });

        return res.status(200).send({message: "User registered OK"});
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Something went wrong" });
    }
});

export default router;
