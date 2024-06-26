import react,{useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import { message } from "antd";
import DefaultLayout from "../components/defaultLayout";
import axios from "axios";
import NavBar from "../components/navbar";
import "../pages/style/register.css";

function Register(){
    
    const navigate = useNavigate();

    const getValue= async(event)=>{
        
        console.log(event);

        event.preventDefault();
        
        const formData = new FormData(event.target);
        const values = Object.fromEntries(formData.entries());
        console.log(values);

        try{
        const response = await axios.post("/api/user/register",values);
        message.success("You have registered successfully");
        navigate('/');
        }
        catch(err){
        message.error(err.response.data);
        }

        
    }
    return (
        <div>
            <NavBar/>
            <div class="containerReg">
                <div class="register-box">
                    <h2>Create Your Movie Buff Account</h2>
                    <form class="register-form" onSubmit={getValue}>
                        <input type="text" id="username" name="username" placeholder="Username" required/>
                        <input type="email" id="email" name="email" placeholder="Email" required/>
                        <input type="password" id="password" name="password" placeholder="Password" required/>
                        <button type="submit">Register</button>
                    </form>
                    <p>Already have an account?<Link to="/login"> <a>Login</a></Link></p>
                </div>
            </div>
        </div>

    );
}

export default Register;