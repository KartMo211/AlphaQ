import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import db from "../dbConnect.js"

const router = express.Router();
router.use(bodyParser.urlencoded({extended:true}));

router.post("/insertTopic", async (req,res)=>{

    console.log(req.body);

    const {topic, content,userId} = req.body;

    const date = new Date();
    console.log(date);

    var result;

    try{
        //this is returning the id of the topic
        result = await db.query("INSERT INTO topic (topicName,datecreated,description,usercreated) VALUES($1,$2,$3,$4) RETURNING _id",[topic,date,content,userId]);
    }

    catch(err){
        console.log(err.message);
        res.status(401).json(err.message);
        return;
    }

    console.log(result.rows[0]);
    const topicId = result.rows[0]._id;

    await db.query("INSERT INTO interests(user_id,topic_id) VALUES($1,$2)",[userId,topicId]);

    res.status(200).json("successfully entered");

});

router.post("/getTopic", async (req,res)=>{

    console.log(req.body);

    const {userId} = req.body;

    try{
        const result = await db.query("SELECT topicname,description FROM interests JOIN topic ON topic._id = interests.topic_id WHERE user_id=$1;",[userId]);
        console.log(result.rows);
        res.status(200).json(result.rows);
    }
    catch(err){
        console.log(err.message);   
        res.status(500).json([]);
    }

});


export default router;
