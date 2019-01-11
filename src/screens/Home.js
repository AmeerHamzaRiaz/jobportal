import React, { Component } from "react";
import { Zoom, Paper, CircularProgress, Typography, Button } from "@material-ui/core";
import TopBar from "../components/TopBar";
import fire from "../config/fire";
import DateRangeIcon from "@material-ui/icons/DateRange";
import LocationCityIcon from "@material-ui/icons/LocationCity";

const styles = {
  main: {
    maxWidth: 600,
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: 24,
    marginRight: 24
  },
  paper: {
    margin: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 20px 20px",
    minWidth: 500
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobPosts: [],
      loading: false,
      jobsApplied: [],
    };
  }

  buttonClicked = (jobID) => {
    let databaseRef = fire.database();
    let uid = fire.auth().currentUser.uid;

    //uploads the jobId and sets it to true then updates the list
    databaseRef
    .ref(`/users/${uid}/jobsApplied`)
    .child(jobID).set(true)
    .then(success => {
        this.setState(prevState => ({
          jobsApplied: [...prevState.jobsApplied, {jobID:true}]
      }))    
    })
    .catch(error => {
      console.log(error);
    })
  }

  componentWillMount() {
    let databaseRef = fire.database();
    let uid = fire.auth().currentUser.uid;

    databaseRef
      .ref("/jobPosts")
      .once("value")
      .then(snapshot => {
        this.setState({ jobPosts: snapshot.val() });
        console.log(this.state.jobPosts);
      })
      .catch(error => {
        alert(error);
      });

    databaseRef
      .ref(`/users/${uid}/jobsApplied`)
      .once("value")
      .then(snapshot => {
        let jobsList = snapshot.val();
        console.log(jobsList);
        this.setState({ jobsApplied: jobsList });
        // console.log(jobsList.hasOwnProperty("2"));
      })
      .catch(error => {
        alert(error);
      });
  }

  renderList = () => {
    if (this.state.jobPosts === []) {
      return (
        <div
          style={{
            textAlign: "center",
            justifyContent: "center",
            height: "90vh",
            display: "flex"
          }}
        >
          <CircularProgress color="primary" />
        </div>
      );
    } else if (this.state.jobPosts === null)
      return (
        <div
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            display: "flex"
          }}
        >
          <h3>No Job Posts</h3>
        </div>
      );
    else {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Typography color='textPrimary' style={{marginTop: 15}} variant="h5" gutterBottom>
          Now Hiring!
          </Typography>

          {this.state.jobPosts.map((item, index) => (
            <Zoom key={item.jobID} in={true} style={{ transitionDelay: `${(index-1)*200}ms` }}>
              <Paper  style={styles.paper} elevation={8}>
                <Typography color='primary' variant="h5" gutterBottom>
                  {item.jobDesignation}
                </Typography>
                <Typography color='textSecondary' variant="h6" gutterBottom>
                  {item.companyName}
                </Typography>
                <div style={{display:'flex',flexDirection:'row'}}>
                  <Typography variant="subtitle1" color='textSecondary' gutterBottom>
                    <DateRangeIcon style={{position:'relative',top:'4px'}} fontSize='small'/> {item.lastDate}
                  </Typography>
                  <Typography style={{paddingLeft: 20}}variant="subtitle1" color='textSecondary' gutterBottom>
                    <LocationCityIcon style={{position:'relative',top:'4px'}} fontSize='small'/> {item.location}
                  </Typography>
                </div>
                <Button disabled={this.state.jobsApplied.hasOwnProperty(item.jobID)} onClick={() => this.buttonClicked(item.jobID)} style={{marginTop: '10px'}} variant="contained" color="secondary">
                  {this.state.jobsApplied.hasOwnProperty(item.jobID) ? "Applied" : "Apply Now"}
                </Button>
              </Paper>
            </Zoom>
          ))}

        </div>
      );
    }
  };
  render() {
    return (
      <div>
        <TopBar title="Student Job Portal" />
        <div>{this.renderList()}</div>
      </div>
    );
  }
}

export default Register;
