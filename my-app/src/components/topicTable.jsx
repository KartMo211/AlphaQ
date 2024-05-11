import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Topic from './topics';



export default function TopicTable(props) {
    console.log(props);
    const {rows}=props;

    const [topicId,setTopicId] = React.useState(-1);
    const [topicName,setTopicName] =React.useState("");
    const [topicContent,setTopicContent] =React.useState("");
    const [topicModal,setTopicModal] = React.useState(false);

    const closeTopicModal = ()=>{
        setTopicModal(false);
    }

  return (
    <div>
        <Topic id={topicId} topicName={topicName} topicContent={topicContent} topicModal = {topicModal} closeTopicModal={closeTopicModal}/>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="right">Serial</TableCell>
                <TableCell align="right">Topic Name</TableCell>
                <TableCell align ="center">Content</TableCell>
                {/* <TableCell align="right">Topic Created By</TableCell> */}
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row,index) => (
                <TableRow
                key={row.topic_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={()=> {
                    setTopicId(row.topic_id);
                    setTopicModal(true);
                    setTopicName(row.topicname);
                    setTopicContent(row.description);
                } }
                >
                <TableCell align="center">{index+1}</TableCell>
                <TableCell align="center">{row.topicname}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>

    </div>

    
  );
}