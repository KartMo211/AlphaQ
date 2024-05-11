import react,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import "./style/login.css";
import DefaultLayout from "../components/defaultLayout";

function Login(){
    
    const navigate = useNavigate();

    const getValue= async(event)=>{
        
        console.log(event);

        event.preventDefault();
        
        const formData = new FormData(event.target);
        const values = Object.fromEntries(formData.entries());
        console.log(values);

        try{
        const response = await axios.post("/api/user/loginCheck",values);
        console.log(response.data);
        localStorage.setItem('AlphaQ',JSON.stringify({userID:response.data.id,email:response.data.email, username:response.data.username}));
        message.success("You have logged in");
        navigate('/');
        }
        catch(err){
        message.error(err.response.data);
        console.log(err);
        }

        
    }
    return (
        <DefaultLayout>
            <div className="loginContainer">
                <div className="login-container">
                    <div className="login-box">
                        <h2 className="loginH2">Welcome Back,<br></br> Movie Buff!</h2>
                        <form className="login-form" onSubmit={getValue}>
                            <input className="loginInput" type="text" id="email" name="email" placeholder="email" required/>
                            <input className="loginInput" type="password" id="password" name="password" placeholder="Password" required/>
                            <button className="loginButton" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultLayout>

    );
}

export default Login;