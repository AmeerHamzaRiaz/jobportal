import React, { Component } from 'react';
import '../styles/App.css';
import SignIn from '../screens/SignIn';
import Register from '../screens/Register';
import Background from '../images/bg.jpg';

const styles = {
  main: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${Background})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
  }
  
}
class App extends Component {
  render() {
    return (
      <div style={styles.main}>
          <Register/>  
          <SignIn />
      </div>
    );
  }
}

export default App;
