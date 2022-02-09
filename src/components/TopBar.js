import Logout from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { ProfilePic } from 'components/ArtistInfo';
import SignupLoginBar from 'components/SignupLoginBar';
import React from 'react';
import { Outlet, useNavigate } from "react-router-dom";



function TopBar(props) {
    const navigateTo = useNavigate();

    return(
        <div className="TopBar" style={{ overflow: 'auto' }}>
            <AppBar position="fixed" color="secondary" style={{ zIndex: 1201 }}>
                <Toolbar variant="dense" style={{ height: 65, width: '100vw' }}>
                    <Box display='flex' >
                        <Button variant="contained" sx={{ minWidth: 125 }}  onClick={ () => navigateTo('/artists') }>Artists</Button>
                        <Button variant="contained" sx={{ ml: 1, minWidth: 125 }} onClick={ () => navigateTo('/dashboard') }>Dashboard</Button>
                    </Box>
                    
                    <Box display="flex" flexGrow={1} justifyContent="flex-end" paddingRight="55px" ml={2}>
                        { (props.loggedInUser != null) &&
                            <AccountMenu loggedInUser={ props.loggedInUser } clearSession={ props.clearSession }/>
                        }
                        
                        { (props.loggedInUser === null) &&
                            <SignupLoginBar setSession={ props.setSession }/>
                        }
                    </Box>
        
                </Toolbar>
            </AppBar>
            {/* This tool bar pushes other elements down so that they don't appear below the actual toolbar */}
            <Toolbar style={{ visibility: 'hidden', marginBottom: 15 }}/>
            
            <Outlet />
            
        </div>
    )
}

function AccountMenu(props) {
    const navigateTo = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <React.Fragment>
            <Box>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                    >
                        <ProfilePic 
                            variant={"small"} 
                            profilePicURL={ props.loggedInUser.profilePicURL } 
                            sx={{ border: '2px solid #D4E8EF' }}
                        />
                    </IconButton>
                </Tooltip>
            </Box>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 32,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={ () => navigateTo("/artists/" + props.loggedInUser.username ) }>
                    <Avatar /> My page
                </MenuItem>
                <MenuItem onClick={ () => navigateTo("/dashboard") }>
                    <Avatar/> My account
                </MenuItem>
                
                <Divider />

                <MenuItem onClick={ () => { props.clearSession() }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );

}

export default TopBar