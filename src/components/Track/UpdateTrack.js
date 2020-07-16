import React, { useState } from "react";
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import axios from 'axios';
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

import { GET_TRACKS_QUERY } from '../../pages/App'
import Error from '../Shared/Error';

const UpdateTrack = ({ classes, track }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(track.title);
  const [description, setDescription] = useState(track.description);
  const [file, setFile] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fileError, setFileError] = useState("");

  const handleAudioChange = (e) => {
    const selectedFile = e.target.files[0]
    const fileSizeLimit = 10000000 //10mb
    if (selectedFile && selectedFile.size > fileSizeLimit) {
      setFileError(`${selectedFile.name}: File size too large`)
    } else {
      setFile(selectedFile)
      setFileError("")
    }
    console.log("file MP3", selectedFile)
  }

  const handleAudioUpload = async () => {
    try {
      const data = new FormData()
      data.append('file', file)
      data.append('resource_type', 'raw')
      data.append('upload_preset', 'react-tracks')
      data.append('cloud_name', 'rosenmatt1')
      const res = await axios.post('https://api.cloudinary.com/v1_1/rosenmatt1/raw/upload', data)
      return res.data.url
    } catch (err) {
      console.error('Error Uploading File', err)
      setSubmitting(false)
    }
  }

  const handleSubmit = async (e, updateTrack) => {
    e.preventDefault()
    setSubmitting(true)
    //upload our audio file and get returned url from API
    const uploadedUrl = await handleAudioUpload()
    console.log("uploadedUrl", uploadedUrl)
    updateTrack({ variables: { title, description, url: uploadedUrl } })
  }

  return (
    <>
      {/* Update Track Button */}
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon/>
      </IconButton>

      {/* Update Track Dialogue */}
      <Mutation
        mutation={UPDATE_TRACK_MUTATION}
        onCompleted={data => {
          console.log({ data })
          setSubmitting(false)
          setOpen(false)
          setTitle("")
          setDescription("")
          setFile("")
        }}
        // refetchQueries={() => [{ query: GET_TRACKS_QUERY }]}  //could also use graphQL subscriptions
      >
        {(updateTrack, { loading, error }) => {
          if (error) return <Error error={error} />

          return (
            <Dialog open={open} className={classes.dialog}>
              <form onSubmit={e => handleSubmit(e, updateTrack)}>
                <DialogTitle> Update Track </DialogTitle>

                <DialogContent>
                  <DialogContentText>
                    Add a Title, Description, & Audio File (under 10mb)
              </DialogContentText>
                  <FormControl fullWidth>
                    <TextField
                      onChange={(e) => setTitle(e.target.value)}
                      label="Title"
                      value={title}
                      placeholder="Add Title"
                      className={classes.textfield}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      rows="2"
                      onChange={(e) => setDescription(e.target.value)}
                      label="Description"
                      value={description}
                      placeholder="Add Description"
                      className={classes.textfield}
                    />
                  </FormControl>
                  <FormControl error={Boolean(fileError)}>
                    <input required id="audio" type="file" accept="audio/*" onChange={handleAudioChange} className={classes.input} />
                    <label htmlFor="audio">
                      <Button variant="outlined" color={file ? "secondary" : "inherit"} component="span" className={classes.button}>
                        Audio File
                        <LibraryMusicIcon className={classes.icon} />
                      </Button>
                      {file && file.name}
                      <FormHelperText> {fileError} </FormHelperText>
                    </label>
                  </FormControl>
                </DialogContent>

                <DialogActions>
                  <Button disabled={submitting} onClick={() => setOpen(false)} className={classes.cancel}>
                    Cancel
                  </Button>
                  <Button type="submit" className={classes.save} disabled={submitting || !title.trim() || !description.trim() || !file}>
                    {submitting ? <CircularProgress className={classes.save} size={24} /> : "Update Track"}
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          )
        }}
      </Mutation>
    </>
  )
};

const UPDATE_TRACK_MUTATION = gql`
  mutation($trackId: Int!, $title: String, $url: String, $description: String) {
    updateTrack(
      trackId: $trackId
      title: $title
      url: $url
      description: $description
    ) {
      racks {
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
  }
`

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  dialog: {
    margin: "0 auto",
    maxWidth: 550
  },
  textField: {
    margin: theme.spacing.unit
  },
  cancel: {
    color: "red"
  },
  save: {
    color: "green"
  },
  button: {
    margin: theme.spacing.unit * 2
  },
  icon: {
    marginLeft: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

export default withStyles(styles)(UpdateTrack);
