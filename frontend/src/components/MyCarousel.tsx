import React from "react";
import Carousel from "react-material-ui-carousel";
import { makeStyles, Paper } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Image } from "cloudinary-react";

const useStyles = makeStyles((theme) => ({
  carousel: {
    margin: 20,
  },
  carouselImage: {
    width: "100%",
    height: "30vh",
  },
}));

const MyCarousel = () => {
  const classes = useStyles();

  var items = [
    {
      name: "Random Name #2",
      description: "Hello World!",
      image:
        "https://res.cloudinary.com/dvvxjkifm/image/upload/v1637224280/ECommerce/Banner4_jnxnno.png",
    },
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      image:
        "https://res.cloudinary.com/dvvxjkifm/image/upload/v1637224287/ECommerce/Banner5_pcr4n9.png",
    },
    {
      name: "Random Name #3",
      description: "Hello World!",
      image:
        "https://res.cloudinary.com/dvvxjkifm/image/upload/v1637223970/ECommerce/Screenshot_from_2021-11-18_13-55-34_w3xywl.png",
    },
    {
      name: "Random Name #3",
      description: "Hello World!",
      image:
        "https://res.cloudinary.com/dvvxjkifm/image/upload/v1637224517/ECommerce/Banner6_ehw9um.png",
    },
    {
      name: "Random Name #3",
      description: "Hello World!",
      image:
        "https://res.cloudinary.com/dvvxjkifm/image/upload/v1637224518/ECommerce/Banner7_uuspbh.png",
    },
  ];

  return (
    <div className={classes.carousel}>
      <Carousel
        animation="slide"
        interval={6000}
        NextIcon={<ArrowForwardIosIcon fontSize="small" />}
        PrevIcon={<ArrowBackIosIcon fontSize="small" />}
        indicators={false}
        navButtonsAlwaysVisible={true}
      >
        {items.map((item, i) => (
          <Paper key={i}>
            <Image
              cloudName="dvvxjkifm"
              className={classes.carouselImage}
              crop="scale"
              alt={item.name}
              src={item.image}
            ></Image>
          </Paper>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
