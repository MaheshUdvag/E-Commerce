import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import "./style.css";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Autoplay, Navigation]);

const Carousel = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            alt=""
            src="https://static01.nyt.com/images/2020/07/17/business/00virus-cities1/00virus-cities1-mediumSquareAt3X.jpg"
            style={{ maxHeight: "40vh" }}
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ maxHeight: "40vh" }}
            alt=""
            src="https://static01.nyt.com/images/2020/07/17/business/00virus-cities1/00virus-cities1-mediumSquareAt3X.jpg"
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ maxHeight: "40vh" }}
            alt=""
            src="https://static01.nyt.com/images/2020/07/17/business/00virus-cities1/00virus-cities1-mediumSquareAt3X.jpg"
          ></img>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
