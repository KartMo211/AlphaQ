import react,{useState,useEffect} from "react";

import { Navigate } from "react-router-dom";
import "../pages/style/navbar.css";


function NavBar(){

    const [profile,setProfile] = useState("Login");

    useEffect(()=>{
        if(localStorage.getItem("AlphaQ")){
            setProfile(JSON.parse(localStorage.getItem("AlphaQ")));
            console.log(profile);
        }
        
    },[localStorage.getItem("AlphaQ")]);



    return (
        <nav className="navbar">
            <div className="containerNav">
                <div className="logo">
                    <a href="#">Movie Buff</a>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search..."/>
                    <button type="submit">Search</button>
                </div>
                <ul className="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Movies</a></li>
                    <li><a href="#">TV Shows</a></li>
                    <li><a href="#">Favorites</a></li>
                </ul>
                <div className="profile">
                    <a href="#">

                        {profile.username}

                    </a>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;