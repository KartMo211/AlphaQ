import react,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { message, Form } from "antd";
import axios from "axios";

import NavBar from "./navbar";
import Button from '@mui/material/Button';
import CreateTopic from "../components/createTopic";
import Topic from "./topics";
import "../pages/style/login.css";
import "../pages/style/home.css";

function DefaultLayout(props){

    const [topics,setTopics] = useState([]);

    const [showModal,setShowModal] = useState(false);

    const getSortedTopics = async()=>{
        try{
            const result = await axios.post("/api/topic/getSortedTopic");
            console.log(result.data);
            setTopics(result.data);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getSortedTopics()
    },[]);

    const closeModal = ()=>{
        setShowModal(false);
    }

    const [topicId,setTopicId] = useState(-1);
    const [topicName,setTopicName] =useState("");
    const [topicContent,setTopicContent] =useState("");
    const [topicModal,setTopicModal] = useState(false);

    const closeTopicModal = ()=>{
        setTopicModal(false);
    }
    
    return (
        <div>
            <NavBar/>
            <Topic id={topicId} topicName={topicName} topicContent={topicContent} topicModal = {topicModal} closeTopicModal={closeTopicModal}/>

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

                        {topics.map((t)=> (<span onClick={
                            ()=>{
                                setTopicId(t._id);
                                setTopicModal(true);
                            }
                            }>{t.topicname}</span>))}

                    </div>
                </div>
            </div>

        </div>

    );
}

export default DefaultLayout;