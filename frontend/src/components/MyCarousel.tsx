import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const MyCarousel = () => {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      image:
        "https://static01.nyt.com/images/2020/07/17/business/00virus-cities1/00virus-cities1-mediumSquareAt3X.jpg",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      image:
        "https://static01.nyt.com/images/2020/07/17/business/00virus-cities1/00virus-cities1-mediumSquareAt3X.jpg",
    },
    {
      name: "Random Name #3",
      description: "Hello World!",
      image:
        "https://static01.nyt.com/images/2020/07/17/business/00virus-cities1/00virus-cities1-mediumSquareAt3X.jpg",
    },
  ];

  return (
    <div style={{ margin: 20 }}>
      <Carousel
        animation="slide"
        interval={3000}
        NextIcon={<ArrowForwardIosIcon />}
        PrevIcon={<ArrowBackIosIcon />}
        indicators={false}
        navButtonsAlwaysVisible={true}
      >
        {items.map((item, i) => (
          <Paper key={i}>
            <img
              alt={item.name}
              src={item.image}
              style={{ maxHeight: "40vh", width: "100%" }}
            ></img>
          </Paper>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
