import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { LoginButton, SignupButton } from "components/CustomButtons";
import { LoginForm, SignupForm } from "components/Forms";
import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import * as server from '../serverAPICalls';


export default function SignupLoginBar(props) {
    const [isLoginFormOpen, setIsLoginFormOpen] = React.useState(false);
    const [isSignupFormOpen, setIsSignupFormOpen] = React.useState(false);
    
    let navigate = useNavigate();
    const routeLocation = useLocation();

    // Close signup form first in case the user clicks
    // the login button inside the signup form
    function handleLoginBttnClick() {
        setIsSignupFormOpen(false);
        setIsLoginFormOpen(true);
    };

    function handleSignupBttnClick() {
        setIsLoginFormOpen(false);
        setIsSignupFormOpen(true);
    };

    async function submitSignupForm(event, profilePicData) {
        event.preventDefault();
    
        let username = event.target.username.value;
        let email = event.target.email.value;
        let password = event.target.password.value;
        
        let signupRequestResponse = await server.submitSignupRequest(username, email, password);
        let user = signupRequestResponse.user
        let jwt = signupRequestResponse.token;

        console.log("profilePicData", profilePicData);

        if(!signupRequestResponse.err) {
            if(profilePicData !== null) {
                let setProfilePicResponse = await server.setProfilePic(username, profilePicData, jwt);
                user = setProfilePicResponse.user; // This user object will have the newly set profilePicURL
            }

            props.setSession(user, jwt);
    
            // If at the mainpage, navigate to the artists page
            if(routeLocation.pathname === '/') {
                navigate("/artists");
            }
        }

        return signupRequestResponse;
    }
    
    async function submitLoginForm(event) {
        event.preventDefault();
    
        const email = event.target.email.value;
        const password = event.target.password.value;
        
        let response = await server.submitLoginRequest(email, password);
       
        if(!response.err) {
            props.setSession(response.user, response.token);
             // If at the mainpage, navigate to the artists page
            if(routeLocation.pathname === '/') {
                navigate("/artists");
            }
        }

        return response;
    }

    return (
        <Grid>
            <Stack direction="row" justifySelf="center" spacing={2}>
                <LoginButton onClick={handleLoginBttnClick}/>
                <SignupButton onClick={handleSignupBttnClick} />
            </Stack>

            <Modal
                open={isLoginFormOpen}
                onClose={() => setIsLoginFormOpen(false)}
                style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                >
                    <LoginForm  handleSubmit={submitLoginForm} onSignupBttnClick = {() => handleSignupBttnClick()}/>
            </Modal>

            <Modal
                open={isSignupFormOpen}
                onClose={() => setIsSignupFormOpen(false)}
                style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                >
                    <SignupForm handleSubmit={submitSignupForm} onLoginBttnClick = {() => handleLoginBttnClick()}/>
            </Modal>
        </Grid>
    );
}