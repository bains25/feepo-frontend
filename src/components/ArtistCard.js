import React from 'react';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Box } from '@mui/system';
import { Avatar } from '@mui/material';
import 'styles/index.css';
import { useNavigate } from "react-router-dom";

function ArtistCard(props) {
    const [raised, setRaised] = React.useState(false);
    let navigate = useNavigate();
    
    function handleClick() {
        navigate("/artists/" + props.artistUsername);
    }

    return(
        <Card
            onMouseOver={ () => setRaised(true) } 
            onMouseOut={ () => setRaised(false) }
            raised={ raised }
            onClick={ () => handleClick() }
            sx={{ width: 250, height: 325, bgcolor: '#EBF3F5' }}
            style={{ cursor: "pointer" }}
        >
            <Avatar 
                src={props.profilePicURL}
                sx={{ width: 200, height: 200, marginTop: 2, marginLeft: 'auto', marginRight: 'auto' }}
                style={{ border: '2.5px solid #2F2963' }}
            />
            <div
                style={{display:'flex', alignItems:'center', justifyContent:'center'}}
            >
                <Typography variant="h4" sx={{ margin: 3, color: '#2F2963' }}>{props.artistUsername}</Typography>
            </div>
        </Card>
    );
}

export default ArtistCard;