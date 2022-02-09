import 'styles/App.css';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import React from 'react';

export default function DrawingFull(props) {

    return(
        <Card 
            sx={{ maxWidth: '75%', margin: 'auto'}}
        >
            <CardMedia
                component="img"
                image={props.imageURL}
                sx={{maxHeight: '100vh'}}
            />
            {/*
                <CardContent>
                <Grid container alignItems="center">
                    <Grid item sx={{ flexGrow: 1 }} >
                        <Typography>$1</Typography>
                    </Grid>
                    <Grid item>
                        <AddToCartButton/>
                    </Grid>
                </Grid>
            </CardContent>
            */}
        </Card>
    );
}