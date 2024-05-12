import react,{useState,useEffect} from "react";
import DefaultLayout from "../components/defaultLayout";
import Button from '@mui/material/Button';
import CreateTopic from "../components/createTopic";
import { Form ,message} from "antd";
import Message from "../components/message";
import Topic from "../components/topics";
import Comment from "../components/comments";
import axios from "axios";
import "./style/home.css";


function Discover(props){

    const [intPost,setIntPost]=useState([]);
    const userId = JSON.parse(localStorage.getItem("AlphaQ")).userID;
    
    const {type} = props;

    const getRequiredPosts = async ()=>{
        try{
            const response = await axios.post("/api/topic/discover",{type:type});
            console.log(response.data);
            setIntPost(response.data);
        }
        catch(err){
            message.error(err.message);
        }
        
    }

    useEffect(()=>{
        getRequiredPosts();
    },[type]);

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
    }

    const [commentModal,setCommentModal] = useState(false)
    const closeCommentModal = ()=>{
        setCommentModal(false);
    }

    // const [comment, setComment] = useState([]);
    // const [commentId, setCommentId] = useState(-1);

    // const submitComment = async (values) => {
    //     try {
    //       const response = await axios.post("/api/comment/insertComment", {
    //         ...values,
    //         userId: userId,
    //         postId: commentId,
    //       });
    //       getComments(commentId);
    //       message.success("Successfully Commented");
    //     } catch (err) {
    //       message.error(err.message);
    //     }
    //   };
    //   const getComments = async (id) => {
    //     try {
    //       const response = await axios.post("/api/comment/getComment", { id: id });
    //       console.log(response.data);
    //       setComment(response.data);
    //       setCommentId(id);
    //     } catch (err) {
    //       message.error(err.message);
    //     }
    //   };
    

    return (
        <DefaultLayout>
            <Topic id={topicId} topicName={topicName} topicContent={topicContent} topicModal = {topicModal} closeTopicModal={closeTopicModal}/>
            <Comment commentModal={commentModal} setCommentModal={closeCommentModal}/>
            <h1>Posts related to your {type}:</h1>

            <div style={{color:'black'}}>

                {intPost.length==0 ? "No Posts so far": ""}

                {intPost.map((values)=>{
                    return (
                        <Message
                            key = {values._id}
                            content = {values.content}
                            id = {values._id} //this is the post id
                            username = {values.username}
                            userId = {values.user_id}
                            topicId = {values.topic_id}
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

export default Discover;