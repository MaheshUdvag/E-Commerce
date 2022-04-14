import { Container, Grid, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles(() => ({
  carouselImage: {
    width: "95%",
    height: "30vh",
    margin: "20px",
  },
  container: {
    width: "90%",
    padding: 20,
  },
  productCards: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productCard: { margin: "5%", width: 250, height: 300 },
}));

const CategorySkeleton = ({ page = "category" }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      {page === "search" ? (
        <></>
      ) : (
        <Skeleton className={classes.carouselImage} variant="rect" />
      )}

      <div style={{ width: "95%", margin: "20px" }}>
        <Skeleton
          variant="rect"
          style={{ float: "left" }}
          height={50}
          width={90}
        />

        <Skeleton
          variant="rect"
          style={{ float: "right" }}
          height={50}
          width={90}
        />
      </div>

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
    </Container>
  );
};

export default CategorySkeleton;
