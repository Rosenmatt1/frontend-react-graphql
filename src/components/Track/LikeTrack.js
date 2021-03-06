import React, { useContext, useState }  from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import { UserContext, ME_QUERY } from '../../Root';


const LikeTrack = ({ classes, trackId, likeCount }) => {
  // console.log(tracks)
  const currentUser = useContext(UserContext);

  const handleDisableLikedTrack = () => {
    const userLike = currentUser.likeSet
    const isTrackLiked = userLike.findIndex(({ track }) => track.id === trackId) > -1
    
    return isTrackLiked
  }

  return (
      <Mutation mutation={CREATE_LIKE_MUTATION} variables={{ trackId }} onCompleted={data => console.log("oncompleted data", data)} refetchQueries={() => [{ query: ME_QUERY }]} >
        {createLike => (
          <IconButton 
            onClick={event => {
              event.stopPropagation();
              createLike()
            }} 
            className={classes.iconButton}
            disabled={handleDisableLikedTrack()}
          >
            {likeCount}
          <ThumbUpIcon className={classes.icon}/>
          </IconButton>
        )}
      </Mutation>
    )
};

//  Whenever have a mutation that updates data in the app, to reflect in cache need to give id and fields that were updated
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
    color: "lightgrey !important",
    "&:disabled": {
      color: "deeppink !important"
    }
  },
  icon: {
    marginLeft: theme.spacing.unit / 2
  },
});

export default withStyles(styles)(LikeTrack);
