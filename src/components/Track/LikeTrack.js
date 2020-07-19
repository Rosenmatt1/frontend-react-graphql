import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";


const LikeTrack = ({ classes, trackId, likeCount }) => {
  return (
      <Mutation mutation={CREATE_LIKE_MUTATION} variables={{ trackId }} onCompleted={data => console.log(data)} >
        {createLike => (
          <IconButton 
            onClick={event => {
              event.stopPropagation();
              createLike()
            }} 
            className={classes.iconButton}
          >

            {likeCount}
          <ThumbUpIcon className={classes.icon}/>
          </IconButton>
        )}
      </Mutation>
    )
};

const CREATE_LIKE_MUTATION = gql`
  mutation($trackId: Int!) {
    createLike(trackId: $trackId) {
      track {
        id 
        likes {
          id
        }
      }
    }
  }
`

const styles = theme => ({
  iconButton: {
    color: "deeppink"
  },
  icon: {
    marginLeft: theme.spacing.unit / 2
  }
});

export default withStyles(styles)(LikeTrack);
