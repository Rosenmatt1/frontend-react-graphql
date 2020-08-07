import React from "react";
import ReactPlayer from "react-player";

const musicStarted = () => {
    // console.log("IT PLAYED11111")
}

const AudioPlayer = ({ url }) => (
    <ReactPlayer url={url} height="30px" width="500px" controls={true} onStart={() => musicStarted()} />
)

export default AudioPlayer;
