import express from "express";
import axios from "axios";
import env from "dotenv";
import bodyParser from "body-parser";

env.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

import userRoute from './Routes/usersRoute.js';
app.use('/api/user/',userRoute);

import insertTopic from './Routes/insertTopic.js';
app.use('/api/topic/',insertTopic);

import userPosts from './Routes/userPosts.js';
app.use('/api/posts/',userPosts);

import userComment from './Routes/userComment.js';
app.use('/api/comment/',userComment);

import userInterest from './Routes/userInterest.js';
app.use('/api/interest/',userInterest);


//checks if the server is working on the port of the server
app.listen(port,()=>{
	console.log(`server running on port ${port}`); 
});