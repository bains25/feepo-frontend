
import { Grid } from '@mui/material';
import ArtistCard from "components/ArtistCard";
import React, { useEffect, useState } from 'react';
import { getArtists } from 'serverAPICalls';

const TEST_PIC_URL = "http://static.demilked.com/wp-content/uploads/2019/08/5d526c73b1566-russian-artist-photoshops-giant-cats-odnoboko-coverimage.jpg";
const TEST_NAME = "Joe"

// TO DO
async function getArtistCards() {
    // TODO: Cache response
    var artists = await getArtists();
    
    var artistCards = [];
    for (var i = 0; i < artists.length; i++) {
        artistCards.push(
            <Grid item key={i}>
                <ArtistCard profilePicURL={artists[i].profilePicURL} artistUsername={artists[i].username}/>
            </Grid>
        );
    }

    return artistCards;
}

export default function ArtistListPage() {
    const [artistCards, setArtistCards] = useState([]);

    useEffect(() => {
        getArtistCards().then(result => {
            setArtistCards(result);
            console.log("Artist List:", artistCards);
        });
    }, []); // [] so that it's only called once on page load

    return(
        <Grid container direction="row" justifyContent="center" spacing={1}>
            {artistCards}
        </Grid>
    );
}