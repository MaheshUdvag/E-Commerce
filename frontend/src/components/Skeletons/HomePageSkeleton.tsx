import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles(() => ({
  header: {
    width: "100%",
    marginBottom: "20px",
    height: "10vh",
  },
  carouselImage: {
    width: "90%",
    height: "30vh",
    margin: "20px",
  },
  productCards: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productCard: { margin: "5%", width: 250, height: 300 },
}));

const HomeHomePageSkeleton = ({ type }) => {
  const classes = useStyles();

  return (
    <div>
      {type === "fallback" && (
        <Skeleton className={classes.header} variant="rect" />
      )}
      <Skeleton className={classes.carouselImage} variant="rect" />

      <Grid container alignItems="center" spacing={3}>
        {[1, 2, 3, 4].map((index) => (
          <Grid key={index} item xs={12} sm={6} lg={3} md={4}>
            <Skeleton
              className={classes.productCard}
              key={index}
              variant="rect"
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomeHomePageSkeleton;
