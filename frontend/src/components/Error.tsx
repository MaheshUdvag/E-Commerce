import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  error: {
    padding: 30,
  },
}));

const Error = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      className={classes.error}
    >
      <Grid item xs={3}>
        <img
          alt="no resutls"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfgrUiFnZKbTkCdl6z_uHD6PAQqkKsb_A7iA&usqp=CAU"
        />
        <Typography component="h3" variant="h3">
          Aaaah! Something went wrong
        </Typography>
        <Typography component="p" variant="subtitle2">
          Brace yourself. we'll get this fixed as soon as possible. Sorry for
          inconvenience. As an interim fix try refreshing, if the issue is still
          persistent. Reach support - support@mcommerce.com
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Error;
