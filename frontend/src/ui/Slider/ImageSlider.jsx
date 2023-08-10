/* eslint-disable react/prop-types */
import styles from "./Slider.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImageSlider({ children }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,

    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return <Slider {...settings}>{children}</Slider>;
}
