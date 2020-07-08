import React from "react";
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import withStyles from "@material-ui/core/styles/withStyles";

import SearchTracks from '../components/Track/SearchTracks';
import TrackList from '../components/Track/TrackList';
import CreateTrack from '../components/Track/CreateTrack';


const App = ({ classes }) => {
  return (
  <div className={classes.container}>
    <SearchTracks />
    <CreateTrack />
    <TrackList />

  </div>
    )
};

const styles = theme => ({
  container: {
    margin: "0 auto",
    maxWidth: 960,
    padding: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(App);
