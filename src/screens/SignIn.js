import React, { Component } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  CircularProgress
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import fire from "../config/fire";
import AlertDialog from "../components/AlertDialog";
import { Link } from "react-router-dom";
const styles = {
  main: {
    maxWidth: 400,
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: 24,
    marginRight: 24
  },
  paper: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "48px 48px 48px"
  },
  avatar: {
    margin: 8,
    backgroundColor: "orange"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 8
  },
  submit: {
    marginTop: 24
  },
  submitLoader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showDialog: false,
      dialogTitle: "",
      dialogMessage: "",
      error: false,
      loading: false
    };
  }

  dialogHandler = () => {
    this.setState({ showDialog: false });
  };

  buttonPressed = e => {
    this.setState({ loading: true });
    console.log(this.state.email + " " + this.state.password);
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(success => {
        console.log(success);
      })
      .catch(error => {
        this.setState({ loading: false });
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({
          error: true,
          showDialog: true,
          dialogTitle: errorCode,
          dialogMessage: errorMessage
        });
        console.log(error);
      });
  };

  render() {
    return (
      <main style={styles.main}>
        <CssBaseline />
        <Paper style={styles.paper} elevation={24}>
          <Avatar style={styles.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Student Sign in
          </Typography>

          <form style={styles.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                error={this.state.error}
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => this.setState({ email: e.target.value })}
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                error={this.state.error}
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => this.setState({ password: e.target.value })}
              />
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={styles.submit}
              onClick={this.buttonPressed}
              disabled={this.state.loading}
            >
              Sign in
              {this.state.loading && (
                <CircularProgress
                  style={styles.submitLoader}
                  color="secondary"
                  size={25}
                />
              )}
            </Button>

            <div style={{ textAlign: "center" }}>
              <Typography
                variant="subtitle1"
                style={{ marginTop: 20 }}
                gutterBottom
              >
                Don't have an account ?{" "}
                <Link style={{ textDecoration: "none" }} to="/registerStudent">
                  Register Now!
                </Link>
              </Typography>
            </div>
          </form>
        </Paper>

        <AlertDialog
          action={this.dialogHandler}
          title={this.state.dialogTitle}
          message={this.state.dialogMessage}
          open={this.state.showDialog}
        />
      </main>
    );
  }
}

export default SignIn;
