import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from "cookie-parser";
import path from "path";
import {v2 as cloudinary} from 'cloudinary';
import myNgoRoutes from './routes/my-ngos';
import hotelRoutes from "./routes/ngos";

// this is the 1st file which runs when the server starts

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);


const app = express();
app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(express.urlencoded({extended: true}));


// Middleware for CORS
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// here it is saying go to the frontend dist folder
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-ngos", myNgoRoutes);
app.use("/api/ngos", hotelRoutes);

app.get("*", (req: Request, res: Response)=>{
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});



app.listen(7000, () => {
  console.log("server running on localhost:7000");
});

