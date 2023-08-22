"use client"
import Image from 'next/image';
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import shop1 from "../../images/shop1.png"
import shp from "../../images/shp.png"
import shop2 from "../../images/shop2.webp"
import shop3 from "../../images/shop3.avif"
import shop4 from "../../images/shop4.webp"
import { useMediaQuery } from '@mui/material';

const Images = [
  {
    id: 1,
    src: shop4,
    alt: "Image 1",
    title: "Lamborghini Huracan Performante",
    description:
      "The Huracán Performante has reworked the concept of super sports cars and taken the notion of performance to levels never seen before.",
  },
  {
    id: 2,
    src: shop2,
    alt: "Image 2 ",
    title: "Porsche 911 Turbo S",
    description:
      "This Turbo S variant comes with an engine putting out 641 bhp @ 6750 rpm and 800 Nm @ 2500 rpm of max power and max torque respectively.",
  },
  {
    id: 3,
    src: shop3,
    alt: "Image 3",
    title: "Ford Mustang",
    description: 
      "For offroad lovers. Super fast, Super Comfortable.",
  },
  {
    id: 4,
    src: shop1,
    alt: "Image 4",
    title: "Lamborghini Aventador SV",
    description:
      "Aventador SV provide thrills unlike anything that has ever been experienced before.",
  },

  
];


const Carousel = ({ items }) => {
  //console.log(Images)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  const isNonMobileScreens = useMediaQuery("(min-width:800px)");
  const isSmallMobileScreens = useMediaQuery("(max-width:550px)");
  function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
      <button className=" carousel-arrow carousel-arrow-prev text-[#000000] text-[90px] absolute top-[30%] z-[100] box-border border-2 border-[black] border-dashed " onClick={onClick}>
        {'<'}
      </button>
    );
  }

  function CustomNextArrow(props) {
    const { onClick } = props;
    return (
      <button className="carousel-arrow carousel-arrow-next text-[black] text-[90px] absolute top-[30%] right-[0%] box-border border-2 border-[#000000] border-dashed drop-shadow-xl " onClick={onClick}>
        {'>'}
      </button>
    );
  }

  return (
    <div className="carousel-container z-[10] w-[100%] box-border">
      <Slider {...settings}>
        {Images.map((item, index) => (
          <div key={index} className={`w-[100%] h-[460px] box-border ${isNonMobileScreens?"h-[460px]":""} ${isSmallMobileScreens?"h-[300px]":"h-[400px]"}`}>
            <Image className='m-auto w-[100%] h-[100%] box-border'  src={item.src} alt={`Slide ${index}`}  />
          </div>
        ))}
      </Slider>

      <style jsx>{`
        .carousel-container {
          position: relative;
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: transparent;
          color: #fff;
          border: none;
          font-size: 18px;
          cursor: pointer;
          z-index: 1;
        }

        .carousel-arrow-prev {
          left: 10px;
          
        }

        .carousel-arrow-next {
          right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Carousel;