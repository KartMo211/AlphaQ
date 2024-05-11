import react,{useState,useEffect} from "react";
import DefaultLayout from "../components/defaultLayout";
import Button from '@mui/material/Button';
import Interests from "../components/interests";
import CreateTopic from "../components/createTopic";
import { Form } from "antd";
import "./style/home.css";


function Home(){

    const [type,setType]=useState(["interests"]);
    const [tag,setTag] = useState(<Interests/>);

    

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

            {tag}
                
        </DefaultLayout>
    );
}

export default Home;