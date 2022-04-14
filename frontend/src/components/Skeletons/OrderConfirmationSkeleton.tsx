import { Container, Grid, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles(() => ({
  title: {
    margin: 15,
  },
  skeletonSpacing: {
    margin: 5,
  },
}));

const OrderConfirmationSkeleton = () => {
  const classes = useStyles();

  return (
    <Container>
      <Skeleton
        className={classes.title}
        height={60}
        width={700}
        variant="rect"
      />
      <Grid container spacing={3}>
        <Grid item lg={9} md={9} sm={12} xs={12}>
          <Grid container spacing={1} className={classes.skeletonSpacing}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Skeleton height={30} width={200} variant="rect" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Skeleton height={15} width={100} variant="rect" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Skeleton height={20} width={100} variant="rect" />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.skeletonSpacing}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Skeleton height={20} width={200} variant="rect" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Skeleton height={15} width={100} variant="rect" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Skeleton height={15} width={100} variant="rect" />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.skeletonSpacing}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Skeleton height={20} width={200} variant="rect" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Skeleton height={15} width={100} variant="rect" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Skeleton height={15} width={100} variant="rect" />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.skeletonSpacing}>
            <Grid item lg={3} md={3} sm={6} xs={6}>
              <Skeleton
                className={classes.skeletonSpacing}
                height={50}
                width={50}
                variant="rect"
              />
            </Grid>
            <Grid item lg={9} md={9} sm={6} xs={6}>
              <Skeleton
                className={classes.skeletonSpacing}
                height={15}
                width={100}
                variant="rect"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} className={classes.skeletonSpacing}>
            <Grid item lg={3} md={3} sm={6} xs={6}>
              <Skeleton
                className={classes.skeletonSpacing}
                height={50}
                width={50}
                variant="rect"
              />
            </Grid>
            <Grid item lg={9} md={9} sm={6} xs={6}>
              <Skeleton
                className={classes.skeletonSpacing}
                height={15}
                width={100}
                variant="rect"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <Skeleton
            className={classes.skeletonSpacing}
            height={400}
            width={300}
            variant="rect"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderConfirmationSkeleton;
