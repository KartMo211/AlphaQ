import react,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { message, Form } from "antd";
import axios from "axios";

import NavBar from "./navbar";
import Button from '@mui/material/Button';
import CreateTopic from "../components/createTopic";
import "../pages/style/login.css";
import "../pages/style/home.css";

function DefaultLayout(props){

    const [topics,setTopics] = useState(["Transformers","Pirates of the Carribean"]);
    const [posts,setPosts] = useState(["Transformers","Pirates of the Carribean"]);

    const [showModal,setShowModal] = useState(false);

    const closeModal = ()=>{
        setShowModal(false);
    }
    
    return (
        <div>
            <NavBar/>

            {showModal?<CreateTopic isModalOpen={showModal} setShowModal={closeModal}/>:<div></div>}


            <div className="contentContainer">
                <div className="contentCol">

                    <h1>Topics</h1>

                    <div className="contentNav">

                        <a>Discover</a>
                        <a>Movies</a>
                        <a>TV Shows</a>
                        <a>Favorites</a>
                        <a>Genres</a>
                        <a>Top Rated</a>
                        <a>Upcoming</a>

                    </div>
                    
                </div>
                <div className="contentCol second">
                    {props.children}
                </div>
                <div className="contentCol third">
                    
                    <Button variant="contained" color="success" className="createBtn" onClick={()=>setShowModal(true)}>Create a Topic</Button>
                    <h1>Trending Topics</h1>

                    <div className="contentNav">

                        {topics.map((t)=> (<span>{t}</span>))}

                    </div>
                </div>
            </div>

        </div>

    );
}

export default DefaultLayout;