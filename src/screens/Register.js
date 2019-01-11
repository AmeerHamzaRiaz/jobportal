import React, { Component } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
  CircularProgress

} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
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
    paddingTop: 20,
    paddingBottom: 20,
    maxWidth: 450,
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
  },
  submitLoader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
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
      address: "",
      degree: "",
      cgpa: "",
      showDialog: false,
      dialogTitle: "",
      dialogMessage: "",
      error: false,
      loading: false
    };
  }
  
  dialogHandler = () => {
    this.setState({showDialog: false});
  }


  buttonPressed = e => {
    this.setState({loading : true});
    const {name, email, mobile, password, address, degree, cgpa} = this.state;
    e.preventDefault();

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(success => {
        let uid = fire.auth().currentUser.uid;
        let database = fire.database();
        database.ref('users/' + uid).set({
          name: name,
          email: email,
          password: password,
          mobile: mobile,
          address: address,
          degree: degree,
          cgpa: cgpa,
          jobsApplied: ''
        });
        this.setState({showDialog: true, dialogTitle: "Registered Successfully", dialogMessage: "Click on the 'Sign In' to Login", loading:false });
     
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({ loading: false, showDialog: true, dialogTitle: errorCode, dialogMessage: errorMessage});
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
              <PersonIcon />
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
                  type="tel"
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

              {/* Degree */}
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="degree">Degree</InputLabel>
                <Input
                  name="degree"
                  id="degree"
                  onChange={e => this.setState({ degree: e.target.value })}
                />
              </FormControl>

              {/* CGPA */}
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="cgpa">CGPA</InputLabel>
                <Input
                  name="cgpa"
                  id="cgpa"
                  onChange={e => this.setState({ cgpa: e.target.value })}
                />
              </FormControl>

              {/* Address */}
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="">Address</InputLabel>
                <Input
                  name="address"
                  id="address"
                  onChange={e => this.setState({ address: e.target.value })}
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
                Register
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
