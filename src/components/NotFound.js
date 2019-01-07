import React from "react";
import { Typography } from "@material-ui/core";

const styles = {
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    }
}


const NotFound = () => {
  return (
    <div
      style={styles.main}
    >
      <Typography variant="h2" component="h2">
        Page Not Found!
      </Typography>
    </div>
  );
};

export default NotFound;
