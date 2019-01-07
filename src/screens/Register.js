import React, { Component } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Background from "../images/bg.jpg";
import { Link } from "react-router-dom";
import fire from "../config/fire";
import AlertDialog from "../components/AlertDialog";

const styles = {
  main: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `linear-gradient(rgba(63, 81, 181, 0.7), rgba(63, 81, 181, 0.7)), url(${Background})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative"
  },
  mainForm: {
    maxWidth: 400,
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: 24,
    marginRight: 24
  },
  paper: {
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
    width: "auto", // Fix IE 11 issue.
    marginTop: 8
  },
  submit: {
    marginTop: 24
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile: "",
      password: "",
      showDialog: false,
      dialogTitle: "",
      dialogMessage: "",
      error: false
    };
  }
  
  dialogHandler = () => {
    this.setState({showDialog: false});
  }


  buttonPressed = e => {
    console.log(this.state.email +" " +this.state.password +" " +this.state.name + " " +this.state.mobile);
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(success => {
        this.setState({showDialog: true, dialogTitle: "Registered Successfully", dialogMessage: "Click on the 'Sign In' to Login"});
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({ showDialog: true, dialogTitle: errorCode, dialogMessage: errorMessage});
        console.log(error);
      });
  };

  render() {
    return (
      <div style={styles.main}>
        <main style={styles.mainForm}>
          <CssBaseline />
          <Paper style={styles.paper} elevation={24}>
            <Avatar style={styles.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register Student Account
            </Typography>
            <form style={styles.form}>
              {/* Full name */}
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Full Name</InputLabel>
                <Input
                  id="name"
                  name="name"
                  autoFocus
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </FormControl>

              {/* Mobile Number */}
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="number">Mobile Number</InputLabel>
                <Input
                  id="number"
                  name="number"
                  onChange={e => this.setState({ mobile: e.target.value })}
                />
              </FormControl>

              {/* Email Address */}
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </FormControl>

              {/* Password */}
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
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
              >
                Register
              </Button>
              <div style={{ textAlign: "center" }}>
                <Typography
                  variant="subtitle1"
                  style={{ marginTop: 20 }}
                  gutterBottom
                >
                  Already have an account ?{" "}
                  <Link style={{ textDecoration: "none" }} to="/">
                    Sign In!
                  </Link>
                </Typography>
              </div>
            </form>
          </Paper>
        </main>
        <AlertDialog
          action={this.dialogHandler}
          title={this.state.dialogTitle}
          message={this.state.dialogMessage}
          open={this.state.showDialog}
        />
      </div>
    );
  }
}

export default Register;
