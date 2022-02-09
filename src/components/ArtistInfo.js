import 'styles/App.css';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function ArtistInfo(props) {
  return (
    <div className="ArtistInfo">
      <Stack direction="row" alignItems="center" spacing={2}>
        <ProfilePic profilePicURL={props.profilePicURL}/>
        <UserTag username={props.artistUsername}/>
      </Stack>
    </div>
  );
}

function ProfilePic(props) {
  if(props.variant == "small") {
    return (
      <Avatar src={props.profilePicURL} sx={{ margin: 1, width: 50, height: 50, ...props.sx }}/>
    );
  }
  else {
    return (
      <Avatar src={props.profilePicURL} sx={{ width: 100, height: 100, ...props.sx }}/>
    );
  }
}

function UserTag(props) {
  return (
    <Typography variant="h4">
      {props.username}
    </Typography>
  );
}

export {
  ArtistInfo,
  ProfilePic,
}