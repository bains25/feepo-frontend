import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import ImageUploading from 'react-images-uploading';


function UploadProfilePic(props) {
    const [images, setImages] = React.useState([]);

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
        props.setProfilePicData(imageList[0]);
    };

    function AddPicButton(props) {
        return(
            <Box {...props.dragProps} display='flex' justifyContent='center' alignItems='center' sx={{ width: '100%' }} >
                <Avatar
                    src={ props.uploadedPic? props.uploadedPic.data_url : null }
                    style={{ position: 'absolute', zIndex: 0, height: 150, width: 150}}
                    sx = {{
                        '& .MuiAvatar-fallback': {
                            opacity: 0.25,
                            color: 'gray'
                        },
                        bgcolor: 'transparent'
                    }}
                />
                
                <Button variant='outlined' onClick ={props.onClick}   sx={{ borderColor: '#91DEFA', borderRadius: 30, height: 150, width: 150, fontSize: 50}}>+</Button>
            </Box>
        );
    }

    return(
        <ImageUploading
            value={images}
            onChange={onChange}
            dataURLKey="data_url"
        >
            {
                ({ onImageUpload, dragProps }) => (
                    <div className="upload__image-wrapper">
                        <AddPicButton onClick={onImageUpload} dragProps={{...dragProps}} uploadedPic={images[0]} />
                    </div>
                )
            }
        </ImageUploading>
    );
}

function SignupForm(props) {
    const [isUsernameTaken, setIsUsernameTaken] = React.useState(null);
    const [isEmailTaken, setIsEmailTaken] = React.useState(null);
    const [isEmailInvalid, setIsEmailInvalid] = React.useState(null);
    const [isUsernameInvalid, setIsUsernameInvalid] = React.useState(null);
    const [isPasswordInvalid, setIsPasswordInvalid] = React.useState(null);

    const [profilePicData, setProfilePicData] = React.useState(null);
    const [creatingUser, setCreatingUser] = React.useState(false);
    
    async function submitForm(event) {
        setCreatingUser(true);
        let response = await props.handleSubmit(event, profilePicData);
        console.log(response);

        if(response.err) {
            setIsUsernameTaken(response.err.isUsernameTaken);
            setIsEmailTaken(response.err.isEmailTaken);
            setIsEmailInvalid(!response.err.isValidEmail);
            setIsUsernameInvalid(!response.err.isValidUsername);
            setIsPasswordInvalid(!response.err.isValidPassword);
        }
        
        setCreatingUser(false);
    }

    return (
        <Paper sx={{ padding: 5, width: 350 }}>
            <Typography variant="h4" sx={{ mb: 0 }}>Sign up</Typography>

            <form onSubmit={(event) => submitForm(event)}>
                <Stack container direction="column" spacing={2}>
                    <UploadProfilePic setProfilePicData={setProfilePicData} />

                    <TextField name="username" label="Username" variant="outlined" />
                    <Typography display={isUsernameTaken? "inline" : "none"} sx={{ alignSelf: 'center', color: 'red', fontSize: '0.75rem' }}>Username is already taken</Typography>
                    <Typography display={isUsernameInvalid? "inline" : "none"} sx={{ alignSelf: 'center', color: 'red', fontSize: '0.75rem' }}>This username is invalid</Typography>

                    <TextField name="email" label="Email" variant="outlined" />
                    <Typography display={isEmailTaken? "inline" : "none"} sx={{ alignSelf: 'center', color: 'red', fontSize: '0.75rem'  }}>There's already an account with this email</Typography>
                    <Typography display={isEmailInvalid? "inline" : "none"} sx={{ alignSelf: 'center', color: 'red', fontSize: '0.75rem'  }}>Please enter a valid email address</Typography>
                    
                    <TextField name="password" label="Password" variant="outlined" type="password"/>
                    <Typography display={isPasswordInvalid? "inline" : "none"} sx={{ alignSelf: 'center', color: 'red', fontSize: '0.75rem' }}>Password is invalid</Typography>
                </Stack>
                
                <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2, width: '100%', height: 40 }}>
                    { creatingUser && <CircularProgress size='1.5rem' color="inherit"/> }
                    { !creatingUser && "Sign up" }
                </Button>

                <Typography display="inline" >Already have an account?</Typography>
                <Box display="inline" sx={{ cursor: "pointer", paddingTop: 0, paddingBottom: 2, paddingRight: 2 }} onClick = {() => props.onLoginBttnClick()}>
                    <Typography display="inline" sx={{ ml: 1, color:"blue" }}>Log in</Typography>
                </Box>
            </form>
        </Paper>
    );
}

function LoginForm(props) {
    const [error, setError] = React.useState(null);

    async function submitForm(event) {
        let response = await props.handleSubmit(event);

        if(response.err) {
            setError(response.err.msg);
        }
    }

    return (
        <Paper sx={{ padding: 5, width: 350 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Log in</Typography>

            <form onSubmit={(event) => submitForm(event)}>
                <Stack container direction="column" spacing={2}>
                    <TextField name="email" id="outlined-based" label="Email" variant="outlined" />
                    <TextField name="password" id="outlined-based" label="Password" variant="outlined" type="password"/>

                     {/*      
                    <Box sx={{ cursor: "pointer", paddingRight: 1 }} onClick={() => {console.log("forgot passward clicked")}}>
                        <Typography display="inline" sx={{ color:"blue" }}>Forgot your password?</Typography>
                    </Box>
                     */}
        
                    <Typography display={error? "inline" : "none"} sx={{ alignSelf: 'center', color: 'red', fontSize: '0.75rem'  }}>{error}</Typography>

               </Stack>
         
                <Button type = "submit" variant="contained" sx={{ mt: 2, mb: 2, width: '100%', height: 40 }}>Log in</Button>
                
                <Typography display="inline" >Don't have an account?</Typography>
                <Box display="inline" sx={{ cursor: "pointer", paddingTop: 0, paddingBottom: 2, paddingRight: 2 }} onClick = {() => props.onSignupBttnClick()}>
                    <Typography display="inline" sx={{ ml: 1, color:"blue" }}>Sign up</Typography>
                </Box>
            </form>

        </Paper>
    );
}

function ResetPasswordForm() {
    return (
        <Paper sx={{ padding: 5 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Reset password</Typography>
            <Stack container direction="column" spacing={2}>
                <TextField id="outlined-based" label="Email" variant="outlined" />
            </Stack>
            <Button variant="contained" sx={{ mt: 2, mb: 2, width: '100%' }}>Submit Request</Button>
        </Paper>
    );
}

function UpdatePasswordForm() {
    return (
        <Paper sx={{ padding: 5 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Password</Typography>
            <Stack container direction="column" spacing={2}>
                <TextField id="outlined-based" label="Current password" variant="outlined" />
                <TextField id="outlined-based" label="New password" variant="outlined" />
                <TextField id="outlined-based" label="Confirm new password" variant="outlined" />
            </Stack>
            <Button variant="contained" sx={{ mt: 2, mb: 2, width: '100%' }}>Update Password</Button>
        </Paper>
    );
}

function UpdateUsernameForm() {
    return (
        <Paper sx={{ padding: 5 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Username</Typography>
            <Stack container direction="column" spacing={2}>
                <TextField id="outlined-based" label="New username" variant="outlined" />
                <TextField id="outlined-based" label="Confirm new username" variant="outlined" />
            </Stack>
            <Button variant="contained" sx={{ mt: 2, mb: 2, width: '100%' }}>Update Password</Button>
        </Paper>
    );
}

export {
    SignupForm,
    LoginForm,
    ResetPasswordForm,
    UpdatePasswordForm,
    UpdateUsernameForm
};
