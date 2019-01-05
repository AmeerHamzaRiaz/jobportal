import React, { Component }  from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
  }
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: ''
     };
  }

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
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </FormControl>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={styles.submit}
          >
            Sign in
          </Button>
          <Typography
            variant="subtitle1"
            style={{ marginTop: 20 }}
            gutterBottom
          >
            Don't have an account ? <a href="#">Register Now!</a>
          </Typography>
        </form>
      </Paper>
    </main>
    );
  }
};

export default SignIn;
