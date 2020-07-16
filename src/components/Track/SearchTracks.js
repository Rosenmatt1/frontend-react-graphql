import React, { useState } from "react";
import { ApolloConsumer } from "react-apollo";
import { gql } from 'apollo-boost';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import ClearIcon from "@material-ui/icons/Clear";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const SearchTracks = ({ classes }) => {
  const [search, setSearch] = useState("")

  const handleSubmit = async (e, client) => {
    e.preventDefault()
    const res = await client.query({
      query: SEARCH_TRACKS_QUERY,
      variables: { search }
    })
    console.log( res )
  }

  return (
    <ApolloConsumer>
      {client => (
        <form onSubmit={e => handleSubmit(e, client)}>
          <Paper className={classes.root} elevation={1}>
            <IconButton>
              <ClearIcon />
            </IconButton>
            <TextField 
              fullWidth 
              placeholder="Search All Tracks" 
              InputProps={{ disableUnderline: true }} 
              onChange={e => setSearch(e.target.value)}
            />
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          </Paper>
        </form>
      )}
    </ApolloConsumer>
  )
};

const SEARCH_TRACKS_QUERY = gql`
  query($search: String) { 
    tracks(search: $search) {
      id
      title
      description
      url
      likes {
        id
      }
      postedBy {
        id 
        username
      }
    }
  }
`
// the exclamation point left off of String means it's not required

const styles = theme => ({
  root: {
    padding: "2px 4px",
    margin: theme.spacing.unit,
    display: "flex",
    alignItems: "center"
  }
});

export default withStyles(styles)(SearchTracks);
