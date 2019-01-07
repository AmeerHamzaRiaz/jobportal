import React, { Component } from "react";
import TopAppBar from "../components/TopAppBar";

const styles = {
  main: {
    maxWidth: 400,
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: 24,
    marginRight: 24
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: ""
    };
  }

  render() {
    return (
      <div>
        <TopAppBar/>
        <main style={styles.main}>
          <h1>Welcome home</h1>
        </main>
      </div>
    );
  }
}

export default Register;
