import react,{useState,useEffect} from "react";
import DefaultLayout from "../components/defaultLayout";
import Button from '@mui/material/Button';
import Interests from "../components/interests";
import CreateTopic from "../components/createTopic";
import { Form,message } from "antd";
import axios from "axios";
import TopicTable from "../components/topicTable";

import "./style/profile.css";


function Profile(){

    //need to get the profile details through local storage

    const {email,userID,username} = JSON.parse(localStorage.getItem("AlphaQ"));


    //need to fetch all the details from which the user has interest
    const [topicDetail,setTopicDetails] = useState([]);

    const getTopics = async ()=>{
        try{
            const response = await axios.post("/api/topic/getTopic",{userId:userID});

            console.log(response.data);
            setTopicDetails(response.data);
        }
        catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=> {
        getTopics();
    },[]);

    

    return (
        <DefaultLayout>
            <div className="profContainer">
                    <div className="profile-header">                
            
                        <div className="profile-header-content">
                            <div className="profile-header-img">
                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""/>
                            </div>
                            <div className="profile-header-info">
                                <h4 className="m-t-10 m-b-5">{username}</h4>
                                <p className="m-b-10">Description about yourself</p>
                                <a href="#" className="btn btn-sm btn-info mb-2">Edit Profile</a>
                            </div>
                        </div>

                        <div className="profile-int-top">
                            
                            <TopicTable rows={topicDetail}/>

                        </div>
                        
                        
                    </div>
            </div>
        </DefaultLayout>
    );
}

export default Profile;