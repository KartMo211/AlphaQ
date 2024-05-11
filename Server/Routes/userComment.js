import express from "express"
import axios from "axios"
// import db from "../dbConnect.js"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import db from "../dbConnect.js"

const router = express.Router();
router.use(bodyParser.urlencoded({extended:true}));

router.post("/getComment", async (req,res)=>{

    const {id} = req.body;

    try{
        const result = await db.query("SELECT user_id,username,comments.content FROM comments JOIN users ON comments.user_id=users._id WHERE post_id = $1",[id]);
        console.log(result.rows);
        res.status(200).json(result.rows);
    }
    catch(err){
        res.status(500).json(err.message);
    }

});

router.post("/insertComment",async (req,res)=>{
    console.log(req.body);
    const {comment,userId,postId} = req.body;

    try{
        await db.query("INSERT INTO comments (post_id,user_id,content) VALUES($1,$2,$3)",[postId,userId,comment]);
        res.status(200).json("Successfully Posted");
    }
    catch(err){
        res.status(500).json(err.message);
    }


})



export default router;
