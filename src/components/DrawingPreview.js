import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import React from 'react';
import 'styles/App.css';
import DrawingFull from './DrawingFull';

class Drawing extends React.Component {

    state = {
        raised: false,
        isModalOpen: false
    }
    
    toggleRaised = () => this.setState({raised:!this.state.raised});
    openModal = () => this.setState({isModalOpen: true});
    closeModal = () => this.setState({isModalOpen: false});

    render() {
        return (
            <div className="Drawing">
               <Card 
                    onMouseOver={this.toggleRaised} 
                    onMouseOut={this.toggleRaised} 
                    onClick={this.openModal}
                    raised={this.state.raised}
                    sx={{ maxWidth: 345 }}
                    style={{ cursor: "pointer" }}
                >
                   <CardMedia
                       component="img"
                       height="200"
                       image={this.props.imageURL}
                   />
               </Card>

               <Modal
                open={this.state.isModalOpen}
                onClose={this.closeModal}
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                >
                    <DrawingFull imageURL={this.props.imageURL}/>
                </Modal>
           </div>
        );
    };
}

export default Drawing;