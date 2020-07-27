import React, { useContext, useState }  from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import { UserContext, ME_QUERY } from '../../Root';


const LikeTrack = ({ classes, trackId, likeCount }) => {
  // const [disabled, setDisabled] = useState(false);
  // console.log("disabled", disabled)
  const currentUser = useContext(UserContext);

  const handleDisableLikedTrack = () => {
    const userLike = currentUser.likeSet
    // console.log("userLike", userLike)
    const isTrackLiked = userLike.findIndex(({ track }) => track.id === trackId) > -1
    // console.log("isTrackLiked", isTrackLiked)
    // isTrackLiked ? setDisabled(true) : setDisabled(false);
    // console.log("disabled in function", disabled)
    return isTrackLiked
  }

  return (
      <Mutation mutation={CREATE_LIKE_MUTATION} variables={{ trackId }} onCompleted={data => console.log(data)} refetchQueries={() => [{ query: ME_QUERY }]} >
        {createLike => (
          <IconButton 
            onClick={event => {
              event.stopPropagation();
              createLike()
            }} 
            // className={classes.iconButton}
            className={likeCount > 0 ? classes.likedIcon : classes.unlikedIcon}
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
        sheva rachel sureyalikes {
          id
        }
      }
    }
  }
`

const styles = theme => ({
  // iconButton: {
  //   color: "violet"
  // },
  likedIcon: {
    color: "green"
  },
  unlikedIcon: {
    color: "grey"
  },
  icon: {
    marginLeft: theme.spacing.unit / 2
  },
  // MuiButtonBase-root-117.MuiButtonBase-disabled-118.MuiIconButton-root-129.MuiIconButton-disabled-133.LikeTrack-iconButton-202: {
  //   color: "red"
  // }
  // color: rgba(0, 0, 0, 0.54);
});

export default withStyles(styles)(LikeTrack);
