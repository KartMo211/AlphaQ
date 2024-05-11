import express from "express";
import axios from "axios";
// import db from './dbConnect.js'
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

// import transactionRoute from './routes/transactionRoute.js';
// app.use('/api/transaction/',transactionRoute);


//checks if the server is working on the port of the server
app.listen(port,()=>{
	console.log(`server running on port ${port}`); 
});