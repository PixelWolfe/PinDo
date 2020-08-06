import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactCardFlip from 'react-card-flip';
import {Grid, Button, Icon, TextField} from "@material-ui/core";
import MoreTwoToneIcon from '@material-ui/icons/MoreTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

class ProjectCard extends Component{
    state = {
        title: this.props.title,
        image_url: this.props.image_url,
        description: this.props.description,
        isFlipped: false
    }

    flipCard = ()=>{
        this.setState({
          ...this.state,
          isFlipped: !this.state.isFlipped
        })
      }

    render(){
        return(
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection='horizontal'>
              <Grid item style={{backgroundColor: 'white', height: '400px'}}>
                  <Button
                      startIcon={<MoreTwoToneIcon/>}
                      variant="outlined"
                      color="primary"
                      style={{backgroundColor:'rgb(247, 242, 171)'}}
                      onClick={this.flipCard}
                  >
                      Description
                  </Button>
                  <Button
                      startIcon={<EditTwoToneIcon/>}
                      variant="outlined"
                      color="primary"
                  >
                    Edit
                  </Button>
                  <div style={{backgroundColor: 'cyan', overflow: 'hidden', maxHeight: '80%' }}>
                    <h2 style={{backgroundColor: 'lightcoral', borderRadius: '20px', paddingLeft: '10px', paddingRight: '10px'}}>{this.state.title}</h2>
                      <img 
                        style={{position: 'relative', width:'100%', overflow: 'hidden', borderRadius: '20px', paddingLeft: '10px', paddingRight: '10px'}}
                        src={this.state.image_url}
                      />
                  </div>
              </Grid>  
              <Grid item style={{backgroundColor: 'white', height: '400px'}}>
                  <Button
                      startIcon={<MoreTwoToneIcon/>}
                      variant="outlined"
                      color="primary"
                      style={{backgroundColor:'rgb(247, 242, 171)'}}
                      onClick={this.flipCard}
                  >
                      Project
                  </Button>
                  <div>
                    <p>
                    {this.state.description}
                    </p>
                </div>
              </Grid> 
            </ReactCardFlip>
        )
    }
}

const mapStateToProps = (reduxState)=>({
    reduxState
})

export default connect(mapStateToProps)(ProjectCard);