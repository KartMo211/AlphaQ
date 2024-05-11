import express from "express"
import axios from "axios"
// import db from "../dbConnect.js"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import db from "../dbConnect.js"

const router = express.Router();
router.use(bodyParser.urlencoded({extended:true}));

router.post("/loginCheck", async (req,res)=>{

    console.log(req.body);

    const email = req.body.email;

    // const salt = await bcrypt.genSalt();
    // const hashpassword = await bcrypt.hash(password,salt);

    try{
        const result = await db.query("SELECT * FROM users WHERE email = $1",[email]);
        

        if(result.rows.length!=1){
            res.status(401).json("Incorrect Username or Password");
        }
        else{
            console.log(result.rows[0]);

            const password = req.body.password;

            const storedHashPassword = result.rows[0].password;

            const match = await bcrypt.compare(password, storedHashPassword);

            if (match) {
                const user = {
                    id: result.rows[0]._id,
                    username: result.rows[0].username,
                    email: result.rows[0].email,
                };
                res.status(200).json(user);
            } else {
                res.status(401).json("Incorrect Username or Password");
            }
        }

        

    }
    catch(err){
        console.log(err.message);
        res.status(401).json(err);
    }


});

router.post("/register", async (req,res)=>{
    console.log(req.body);

    const{username,email, password} = req.body;

    const salt = await bcrypt.genSalt();
    const hashpassword = await bcrypt.hash(password,salt);

    try{
        const result = await db.query("INSERT INTO users(username,email,password) VALUES($1,$2,$3)",[username,email,hashpassword]);
        res.status(200).json("Successfully Registered");
    }
    catch(err){
        res.status(401).json(err);
        console.log(err);
    }

});


export default router;
