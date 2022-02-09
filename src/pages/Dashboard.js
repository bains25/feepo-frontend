import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { UpdatePasswordForm, UpdateUsernameForm } from 'components/Forms';
import React from 'react';
import ImageUploading from 'react-images-uploading';
import { useNavigate } from "react-router-dom";
import * as server from '../serverAPICalls';

const testImage = "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg";
const drawerWidth = 240;

function DrawingDetails() {
    return(
        <div></div>
    );
}

function UploadImagesBox(props) {
    const [images, setImages] = React.useState([]);
    const [isInfoTextVisible, setIsInfoTextVisible] = React.useState(true);
    const [bttnVisibilities, setBttnVisibilities] = React.useState([]);
    const [presignedPostData, setPresignedPostData] = React.useState();
    const [isUploading, setIsUploading] = React.useState(false);
    //const [presignedURLData, setPresignedURLData] = React.useState();
    const maxNumber = 690;

    let navigateTo = useNavigate();

    const onChange = (imageList, addUpdateIndex) => {
      if(imageList.length > 0) {
          setIsInfoTextVisible(false);
      }
      else {
          setIsInfoTextVisible(true);
      }

      // data for submit
      console.log(imageList);
      setImages(imageList);
    };

    function updateBttnVisibility(index, isVisible) {
        // Must update before copying otherwise some updates may be lost when 
        // multiple updates occur at the same time
        bttnVisibilities[index] = isVisible;
        var newBttnVisibilities = [...bttnVisibilities];
        setBttnVisibilities(newBttnVisibilities);
    }

    async function handleUpload(imageList) {
        let imageURLs = [];
        let jwt = props.jwt;
        
        if(imageList.length > 0) {
            setIsUploading(true);

            // imageList.map returns an array of promises
            // Promise.all makes it so that each image can be handled in parallel
            await Promise.all(imageList.map(async (image) => {
                let presignedURLData = await server.getSignedURLData(image.file.name, jwt);
                var signedURL = presignedURLData.uploadURL;
                var objectURL = signedURL.split('?')[0]; // Link to object after it's been uploaded
                
                var imageData = image.data_url.replace(/^data:image\/\w+;base64,/, "");       
                var buffer = Buffer.from(imageData,'base64');
                var blobData = new Blob([new Uint8Array(buffer)], {type: image.file.type});
                
                var awsUploadRes = await fetch(signedURL, {
                    method: 'PUT',
                    mode: 'cors',
                    body: blobData
                });
                
                imageURLs.push({ imageURL: objectURL });
            }));
            
            let response = await server.updateArtistImages(imageURLs, jwt);
            navigateTo("/artists/" + props.loggedInUser.username);
        }

        setIsUploading(false);
        return imageURLs;
    }

    return (
      <div className="App">
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={['png', 'jpg', 'jpeg']}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              
                <Grid container spacing={2} justifyContent="center" alignItems="baseline" sx={{ mt: 1}} >
                    {imageList.map((image, index) => (
                        <Grid key={"gridItem" + index} item>
                        <div 
                            className="image-item" 
                            onMouseEnter={ () => updateBttnVisibility(index, true) }
                            onMouseLeave={ () => updateBttnVisibility(index, false) }
                        >
                            <img src={image['data_url']} alt="" width="100" /> 

                            { !bttnVisibilities[index] && 
                                // This hidden button keeps the grid element size the same which prevents imgs 
                                // from moving when the actual bttn becomes visible
                                <div key={"hiddenBttnCtnr" + index} className="image-item__btn-wrapper" style={{ visibility: "hidden" }}>
                                    <Button variant="outlined" key={"bttn" + index} onClick={() => onImageRemove(index)}>Remove</Button>
                                </div>
                            }

                            { bttnVisibilities[index] && // Actual button that's displayed
                                <div key={"bttnCtnr" + index} className="image-item__btn-wrapper" >
                                    <Button variant="outlined" key={"bttn" + index} onClick={() => onImageRemove(index)}>Remove</Button>
                                </div>
                            }
                        </div>
                        </Grid>
                    ))}
                </Grid>
                            
                <Box padding="20%" {...dragProps} sx={{ margin: 'auto', maxWidth: '70%' }}>
                    { isInfoTextVisible &&
                        <Typography variant="h3" align="center">Drag and drop images here or...</Typography>
                    }
                    <Box sx={{ minWidth: '100%', textAlign: "center" }}>
                        <Button variant="contained" onClick={onImageUpload} >Select Images</Button>
                    </Box>
                </Box>

                <Divider />

                <Box p="5%" sx={{ display: "flex"}}>
                    {/*<TextField id="default-price" label="Default Price" variant="outlined" defaultValue="1.00" sx={{ mr: 5 }}/>*/}
                    <Box sx={{ flexGrow: 1, textAlign: "right",  mt: 'auto' }}>
                        <Button style={{ minWidth: 125, minHeight: 50 }} onClick={ () => handleUpload(imageList).then((result) =>  {console.log("result", result);}) } variant="contained" sx={{ p: 1.5, pl: 4, pr: 4 }}>
                            { isUploading && <CircularProgress size='1.5rem' color="inherit"/> }
                            { !isUploading && "Upload" }
                        </Button>
                    </Box>
                </Box>
            </div>
          )}
        </ImageUploading>
      </div>
    );
}

function DrawingsTable() {
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];

    return(
        <Paper>
        <Grid container direction="row-reverse">
            <Grid item xs={12} xl={5}>
            <Paper>
                <img style={{ "height": '100%', "width": '100%' }} src={testImage} />
            </Paper>
            </Grid>

            <Grid item xs={12} xl={7}>
            <TableContainer component={Paper} sx={{ flexShrink: 1 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Grid>
        </Grid>
        </Paper>
    );
}

function UpdatePasswordCard() {
    return(
        <Card sx={{ padding: 5 }}>
            <UpdatePasswordForm/>
        </Card>
    );
}

function EmailCard() {
    return(
        <Card sx={{ padding: 5 }}>
            <Typography variant="h4">Email</Typography>
            <Typography variant="h6">Test@test.com</Typography>
        </Card>
    );
}

function UsernameCard() {
    return(
        <Card sx={{ padding: 5 }}>
            <UpdateUsernameForm/>
        </Card>
    );
}

function AccountSettings() {
    return(
        <Stack spacing={2}>
            <EmailCard/>
            <UpdatePasswordCard/>
            <UsernameCard/>
        </Stack>
    );
}

export default function Dashboard(props) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    let navigateTo = useNavigate();
    if(props.jwt === null) {
        console.log("no jwt");
    }
    
    return(
        <React.Fragment>
            {/*<Drawer
                position="relative" 
                variant="permanent" 
                open={open} 
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
                }}
            >
                <Toolbar style={{ height: 80, display: 'hidden'}} />
                <Button variant="text">Upload Images</Button>
            </Drawer>*/}

            <Box style={{ padding: 10, minWidth: '95vw', minHeight: '85vh' }}>
                <Card variant='outlined' style={{ margin: 'auto', minWidth: 450, maxWidth: '90vh' }}>
                    { props.jwt === null &&
                        <Typography align='center' variant='h4' p='20%'>Want to upload pictures? Be sure to log in or sign up first!</Typography>
                    
                    }
                    { props.jwt !== null &&
                        <UploadImagesBox loggedInUser={props.loggedInUser} jwt={ props.jwt }/>
                    }
                </Card>
            </Box>

        </React.Fragment>
    );

}