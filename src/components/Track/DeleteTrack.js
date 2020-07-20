import React, { useState, useContext } from "react";
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import IconButton from "@material-ui/core/IconButton";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";

import { UserContext } from '../../Root';
import { GET_TRACKS_QUERY } from '../../pages/App';

const DeleteTrack = ( { track } ) => {
  const currentUser = useContext(UserContext);
  const isCurrentUser = currentUser.id === track.postedBy.id

  const handleUpdateCache = (cache, { data: { deleteTrack } }) => {  //cache can also be called proxy
    const data = cache.readQuery({ query: GET_TRACKS_QUERY })  //readQuery does not hit server, only cache
    const index = data.tracks.findIndex(track => Number(track.id) === deleteTrack.trackId)
    // data.tracks.splice(index, 1)  //splice would mutate original array
    const tracks = [...data.tracks.slice(0, index), ...data.tracks.slice(index + 1)]
    cache.writeQuery({ query: GET_TRACKS_QUERY, data: { tracks } }) //writeQuery does not hit server, only cache
  }

  return isCurrentUser && (
      <Mutation 
        mutation={DELETE_TRACK_MUTATION}
        variables={{ trackId: track.id}}
        onCompleted={data => {
          console.log(data)
        }}
        update={handleUpdateCache}
        // refetchQueries={() => [{ query: GET_TRACKS_QUERY }]}  //could also use graphQL subscriptions
      >
        {deleteTrack => (
          <IconButton onClick={deleteTrack}>
            <TrashIcon/>
          </IconButton>
        )}
      </Mutation>
    )
};

const DELETE_TRACK_MUTATION = gql`
  mutation($trackId: Int!) {
    deleteTrack(trackId: $trackId) {
      trackId
    }
  }
`

export default DeleteTrack;
