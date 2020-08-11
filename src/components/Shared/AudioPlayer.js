import React from "react";
import ReactPlayer from "react-player";
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const musicStarted = () => {
    // console.log("IT PLAYED11111")
}

const AudioPlayer = ({ url }) => (
    <ReactPlayer url={url} height="30px" width="500px" controls={true} onStart={() => musicStarted()} />
)

//  Whenever have a mutation that updates data in the app, to reflect in cache need to give id and fields that were updated
const CREATE_PLAY_MUTATION = gql`
  mutation($trackId: Int!) {
    createPlayed(trackId: $trackId) {
      track {
        id 
        plays {
          id
        }
      }
    }
  }
`

export default AudioPlayer;
