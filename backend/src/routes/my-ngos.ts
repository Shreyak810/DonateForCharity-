import express, {Request, Response} from "express";
import multer from 'multer';
import { buffer } from "stream/consumers";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

// here we are specifying that the imagrs that we are going to store int he multer's memory storage
const storage = multer.memoryStorage();

// it specifies that the max file size of the image can be 5MB
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024 //5MB
    }
})

// api/my-ngos. we can upload max 6 images for each ngo
router.post(
    "/",
    verifyToken, [
        body("name").notEmpty().withMessage('Name is required'),
        body("city").notEmpty().withMessage('City is required'),
        body("country").notEmpty().withMessage('Country is required'),
        body("decription").notEmpty().withMessage('Description is required'),
        body("type").notEmpty().withMessage('Hotel Type is required'),
        body("preicePerNight").isNumeric().withMessage('Price Per Night is required and must be a number'),
        body("facilities").notEmpty().isArray().withMessage('Facilities is required and must be a number'),
    ],

    
    upload.array("imageFiles", 6), 
    async (req: Request, res: Response) =>{
    try{
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;
        
        
        // 1. upload the images to tge cloudinary
 
        const uploadPromises = imageFiles.map(async(image)=>{
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });
        
        // it is going to wait for all the images to be get uploaded
        // 2. if upload was successful, add the urls to the new hotel
        const imageUrls = await Promise.all(uploadPromises);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        
        
        // 3. save the new hotel in our database
        const hotel = new Hotel(newHotel);
        await hotel.save();

        // 4. return as 201 status
        res.status(201).send(hotel);
    } catch(e)
    {
        console.log("Error creating ngo: ", e);
        res.status(500).json({message: "Something went wrong"});
    }
});

router.get("/", verifyToken, async(req: Request, res: Response)=>{
    
    try{
        const hotels = await Hotel.find({userId: req.userId});
        res.json(hotels);
    }catch(error)
    {
        res.status(500).json({message: "Error fetching the NGOs"});
    }
})

export default router;