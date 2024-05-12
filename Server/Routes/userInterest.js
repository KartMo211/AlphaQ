import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import db from "../dbConnect.js"

const router = express.Router();
router.use(bodyParser.urlencoded({extended:true}));

router.post("/check",async(req,res)=>{
    const {userId,topicId} = req.body;

    console.log(req.body);

    try{
        const result = await db.query("SELECT * FROM interests WHERE user_id=$1 AND topic_id =$2",[userId,topicId]);
        res.status(200).json(result.rows);
    }
    catch(err){
        res.status(500).json(err.message);
    }
})

router.post("/follow", async (req,res)=>{

    const {userId,topicId} = req.body;

    try{
        await db.query("INSERT INTO interests(user_id,topic_id) VALUES($1,$2)",[userId,topicId]);
        try{
            await db.query("UPDATE topic SET impressions = impressions + 1 WHERE _id = $1;",[topicId]);
            res.status(200).json("Successfully Followed");
        }
        catch(err){
            console.log(err);
            res.status(500).json(err.message);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json(err.message);
    }

});

router.post("/unfollow", async (req,res)=>{

    const {userId,topicId} = req.body;

    try{
        await db.query("DELETE FROM interests WHERE user_id=$1 AND topic_id = $2",[userId,topicId]);
        try{
            await db.query("UPDATE topic SET impressions = impressions - 1 WHERE _id = $1;",[topicId]);
            res.status(200).json("Successfully unfollowed");
        }
        catch(err){
            console.log(err);
    
            res.status(500).json(err.message);
        }
    }
    catch(err){
        console.log(err);

        res.status(500).json(err.message);
    }

});


export default router;
