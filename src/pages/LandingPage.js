import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    let navigateTo = useNavigate();

    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ minWidth: "100vw", minHeight: '80vh' }}>
            <Grid item>
                <Typography variant="h2" align="center">Welcome to my project!</Typography>
            </Grid>

            <Button variant="contained"  onClick={() => navigateTo('/artists')} >View Artists</Button>
        </Grid>
    );
}
/*
export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginFormOpen: false,
            isSignupFormOpen: false,
        }
    }

    handleLoginBttnClicked(value) {
        this.state.isLoginFormOpen = value;
    }

    handleSignupBttnClicked(value) {
        this.state.isSignupFormOpen = value;
    }

    render() {
        return (
            <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
                <Grid item>
                    <Typography variant="h2" align="center">Welcome to my project!</Typography>
                </Grid>

                <Stack direction="row" justifySelf="center" spacing={2}>
                    <Box onClick = {() => this.handleLoginBttnClicked(true)}>
                        <LoginButton />
                    </Box>
                    <Box onClick = {() => this.handleSignupBttnClicked(true)}>
                        <SignupButton />
                    </Box>
                </Stack>

                <Modal
                    open={this.state.isLoginFormOpen}
                    onClose={() => this.handleLoginBttnClicked(false)}
                    style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                    >
                        <LoginForm/>
                </Modal>

                <Modal
                    open={this.state.isSignupFormOpen}
                    onClose={() => this.handleSignupBttnClicked(false)}
                    style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                    >
                        <SignupForm/>
                </Modal>
            </Grid>
        );
    }
  }
  */