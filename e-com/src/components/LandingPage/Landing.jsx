"use client";
import BestDeals from "@/components/bestDeals/BestDeals";
import Carousel from "@/components/carousel/Carousel";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "../Footer";
import { useMediaQuery } from "@mui/material";
import MobileDrawer from "../clippedDrawer/MobileDrawer";
import Search from "../search/Search";
import { BiSearchAlt } from "react-icons/bi";
import MobileSearchBox from "../MobileSearchBar/MobileSearchBox";
const Landing = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:800px)");

  return (
    <div className={` w-[99vw]  `}>
      <MobileSearchBox />

      <Carousel />
      <BestDeals heading="Best Deals of the day" />
      <BestDeals heading="Most Sold"/>
      
    </div>
  );
};

export default Landing;
