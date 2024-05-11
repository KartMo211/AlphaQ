import react,{useState,useEffect} from "react";
import DefaultLayout from "../components/defaultLayout";
import Button from '@mui/material/Button';
import CreateTopic from "../components/createTopic";
import { Form ,message} from "antd";
import Message from "../components/message";
import Topic from "../components/topics";
import axios from "axios";
import "./style/home.css";


function Home(){

    const [intPost,setIntPost]=useState([]);
    const userId = JSON.parse(localStorage.getItem("AlphaQ")).userID;
    

    const getInterestPosts = async ()=>{
        try{
            const response = await axios.post("/api/posts/interestPost",{userId:userId});
            console.log(response.data);
            setIntPost(response.data);
        }
        catch(err){
            message.error(err.message);
        }
        
    }

    const [topicId,setTopicId] = useState(-1);
    const [topicName,setTopicName] =useState("");
    const [topicContent,setTopicContent] =useState("");
    const [topicModal,setTopicModal] = useState(false);

    const closeTopicModal = ()=>{
        setTopicModal(false);
    }
    const openTopicModal= ()=>{
        setTopicModal(true);
    }

    const setTopic = (value)=>{
        setTopicId(value);
        console.log(topicId);

    }

    useEffect(()=>{
        getInterestPosts();
    },[]);
    

    return (
        <DefaultLayout>
            <Topic id={topicId} topicName={topicName} topicContent={topicContent} topicModal = {topicModal} closeTopicModal={closeTopicModal}/>

            <h1>Posts related to your interest:</h1>

            <div style={{color:'black'}}>
                {intPost.map((values)=>{
                    return (
                        <Message
                            key = {values._id}
                            content = {values.content}
                            id = {values._id}
                            username = {values.username}
                            userId = {values.user_id}
                            topicname = {values.topicname}
                            getComments = {(int)=>console.log("Hello")}
                            setTopic = {setTopic}
                            openTopicModal={openTopicModal}
                        />
                    );
                })}
            </div>
                
        </DefaultLayout>
    );
}

export default Home;