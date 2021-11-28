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
    width: "95%",
    height: "30vh",
    margin: "20px",
  },
  productCards: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productCard: { margin: "30px" },
}));

const PageSkeleton = () => {
  const classes = useStyles();

  return (
    <div>
      <Skeleton className={classes.carouselImage} variant="rect" />
      <div className={classes.productCards}>
        {[1, 2, 3, 4].map((index) => (
          <Skeleton
            className={classes.productCard}
            key={index}
            variant="rect"
            width={250}
            height={350}
          />
        ))}
      </div>
    </div>
  );
};

export default PageSkeleton;
