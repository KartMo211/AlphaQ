import react,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import "../pages/style/login.css";
import NavBar from "./navbar";

function DefaultLayout(props){
    
    
    return (
        <div>
            <NavBar/>

            <div>
                {props.children}
            </div>

        </div>

    );
}

export default DefaultLayout;