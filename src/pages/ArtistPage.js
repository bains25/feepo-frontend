import { Grid, Typography } from '@mui/material';
import { ArtistInfo } from 'components/ArtistInfo';
import Drawing from 'components/DrawingPreview';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as apiCalls from '../serverAPICalls';

function ArtistPage() {
    const [drawings, setDrawings] = useState([]);
    const [artist, setArtist] = useState();
    let { artistUsername } =  useParams();
    let { profilePicURL } =  useParams();
    
    useEffect(() => {
      apiCalls.getArtistInfo(artistUsername).then((artist) => {
        var drawings = [];
        for (var i = 0; i < artist.images.length; i++) {
          drawings.push(<Grid item key={i}><Drawing imageURL={artist.images[i].imageURL}/></Grid>);
        }

        if(artist.images.length === 0) {
          drawings.push(<Grid item><Typography variant='h5'>{artistUsername} hasn't uploaded any drawings yet!</Typography></Grid>);
        }

        setArtist(artist);
        console.log(artist);
        setDrawings(drawings);
      })
    }, []);


    return (
        <React.Fragment>
          <div style={{ marginLeft: 20, marginBottom: 10 }}>
            <ArtistInfo artistUsername={artistUsername} profilePicURL={artist? artist.profilePicURL: null} />
          </div>

          <Grid container direction="row" justifyContent="center" spacing={1} style={{paddingTop: 20, paddingBottom: 20, paddingLeft: 70, paddingRight: 70}}>
            {drawings}
          </Grid>
        </React.Fragment>
      );
}

export default ArtistPage;