import React from "react";
import { Typography, Button } from "@material-ui/core";
import fire from "../config/fire";
const styles = {
  main: {
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    backgroundColor: "#3f51b5",
    padding: "5px",
    boxShadow: "0 1px 13px rgba(0, 0, 0, 0.12), 0 1px 12px rgba(0, 0, 0, 0.24)"
  },
  button: {
    marginTop: '7px',
    float: "right",
    marginRight: '10px'
  },
  typo: {
    marginTop: '10px',
    float: "left",
    color: "white",
    marginLeft: '20px'
  }
};

const TopBar = (props) => {
  return (
    <div style={styles.main}>
      <Typography variant="h5" style={styles.typo} gutterBottom>
        {props.title}
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          fire
            .auth()
            .signOut()
            .then(success => {
              console.log(success);
            })
            .catch(error => {
              console.log(error);
            });
        }}
        color="secondary"
        style={styles.button}
      >
        LOG OUT
      </Button>
    </div>
  );
};

export default TopBar;
