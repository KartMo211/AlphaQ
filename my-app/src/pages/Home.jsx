import react,{useState,useEffect} from "react";
import DefaultLayout from "../components/defaultLayout";
import Button from '@mui/material/Button';
import Interests from "../components/interests";
import CreateTopic from "../components/createTopic";
import { Form } from "antd";
import "./style/home.css";


function Home(){

    const [topics,setTopics] = useState(["Transformers","Pirates of the Carribean"]);
    const [posts,setPosts] = useState(["Transformers","Pirates of the Carribean"]);
    const [type,setType]=useState(["interests"]);
    const [tag,setTag] = useState(<Interests/>);

    const [showModal,setShowModal] = useState(false);

    const closeModal = ()=>{
        setShowModal(false);
    }

    useEffect(()=>{

        switch(type){
            case "interests":
                setTag(<Interests/>);
                break;
            // case "createTopic":
            //     setTag(<CreateTopic/>);
            //     break;
        }


    },[type]);
    

    return (
        <DefaultLayout>

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
                    {tag}
                </div>
                <div className="contentCol third">
                    
                    <Button variant="contained" color="success" className="createBtn" onClick={()=>setShowModal(true)}>Create a Topic</Button>
                    <h1>Trending Topics</h1>

                    <div className="contentNav">

                        {topics.map((t)=> (<span>{t}</span>))}

                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Home;