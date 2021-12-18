import { Card, Typography } from "@material-ui/core";
import { Image } from "cloudinary-react";
import React from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 200,
    height: 250,
    cursor: "pointer",
    "&:hover": {
      boxShadow: "5px 10px 18px #888888",
    },
    padding: 15,
    textAlign: "center",
  },
  categoryImage: {
    height: 200,
    width: 200,
  },
}));

const Category: React.FC<any> = ({ category }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card
      variant="outlined"
      className={classes.card}
      onClick={() => history.push(`/category/${category.path}`)}
    >
      <Image
        src={category.description[0].categoryImage}
        alt={category.name}
        className={classes.categoryImage}
      />
      <Typography component="p" variant="subtitle1">
        {category.name.toUpperCase()}
      </Typography>
    </Card>
  );
};

export default Category;
