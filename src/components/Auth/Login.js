import React, { useState } from "react";
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Lock from "@material-ui/icons/Lock";

import Error from "../Shared/Error"

const Login = ({ classes, setNewUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Lock />
        </Avatar>
        <Typography variant="title">
          Login as existing User
      </Typography>

        <Mutation mutation={REGISTER_MUTATION} variables={{ username, password }} >
          {(createUser, { loading, error }) => {

            const handleSubmit = (e, createUser) => {
              e.preventDefault()
              createUser()
              // This object could be passed into createUser, instead of passing variables into Mutation tag
              // {
              //   variables: {
              //     username: username,
              //     password: password
              //   }
              // }
            }

            return (
              <form onSubmit={(e) => handleSubmit(e, createUser)} className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="username"> Username </InputLabel>
                  <Input id="username" onChange={e => setUsername(e.target.value)} />
                </FormControl >

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password"> Password </InputLabel>
                  <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </FormControl >
                <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading || !username.trim() || !password.trim()} className={classes.submit}>
                  {loading ? "Loging In..." : "Log In"}
                </Button>
                <Button fullWidth color="secondary" variant="outlined" onClick={() => setNewUser(true)}>
                  New user? Register here
              </Button>

                {/* Error Handling  */}
                {error && <Error error={error} />}
              </form>
            )
          }}
        </Mutation>
      </Paper>

    </div>
  )
};

const styles = theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing.unit * 2
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.secondary.main
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Login);
