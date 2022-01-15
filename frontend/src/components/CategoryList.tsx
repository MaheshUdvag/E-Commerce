import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Category from "./Category";

const useStyles = makeStyles(() => ({
  container: {
    width: "90%",
    padding: 10,
  },
  categoryTitle: {
    padding: 10,
    textTransform: "uppercase",
  },
}));
const CategoryList: React.FC<any> = ({ categories, label }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography component="h5" variant="h5" className={classes.categoryTitle}>
        {label}
      </Typography>
      <Grid container alignItems="center" spacing={2}>
        {categories.map((category: any) =>
          category.subCategories.map((category: any) => (
            <Grid key={category._id} item xs={12} sm={5} lg={3} md={4}>
              <Category category={category} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default CategoryList;
