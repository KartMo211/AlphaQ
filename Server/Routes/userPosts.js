import express from "express"
import axios from "axios"
// import db from "../dbConnect.js"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import db from "../dbConnect.js"

const router = express.Router();
router.use(bodyParser.urlencoded({extended:true}));

router.post("/getPost", async (req,res)=>{

    console.log(req.body);

    const {topicId} = req.body;

    try{
        const result = await db.query("SELECT posts._id,user_id,topic_id,content,username FROM posts JOIN users ON posts.user_id=users._id WHERE topic_id=$1;",[topicId]);
        res.status(200).json(result.rows);
    }
    catch(err){
        res.status(500).json(err.message);
    }

});

router.post("/insertPost",async (req,res)=>{
    console.log(req.body);
    const {post,userId,topicId} = req.body;

    try{
        await db.query("INSERT INTO posts (user_id,topic_id,content) VALUES($1,$2,$3)",[userId,topicId,post]);
        res.status(200).json("Successfully Posted");
    }
    catch(err){
        res.status(500).json(err.message);
    }


})

router.post("/interestPost",async (req,res)=>{
    console.log(req.body);
    const {userId} = req.body;

    try{
        await db.query("INSERT INTO posts (user_id,topic_id,content) VALUES($1,$2,$3)",[userId,topicId,post]);
        res.status(200).json("Successfully Posted");
    }
    catch(err){
        res.status(500).json(err.message);
    }


})



export default router;
