import express, {Request, Response} from "express";
import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";

const router = express.Router();

// /api/ngos/search?  
router.get("/search", async(req: Request, res: Response) =>{
    try{
        // we have defined the page size. It specifies that how ngos to be shown on the page at one time when the user is on the search page. If we don't specify it then it will display all the ngos in the server. And it is costly when no of user =s increases 
        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");

        // it tells how many pages to skip
        const skip = (pageNumber-1)*pageSize;
        const hotels = await Hotel.find().skip(skip).limit(pageSize);

        const total = await Hotel.countDocuments();

        const response: HotelSearchResponse = {
            data: hotels,
            pagination:{
                total,
                page: pageNumber,
                pages: Math.ceil(total/pageSize),
            },
        };

        res.json({response});
    } catch(error) {
        console.log("error", error);
        res.status(500).json({message: "Something went wrong"});
    }
});

export default router;

