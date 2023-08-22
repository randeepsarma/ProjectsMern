import List from "@/components/List/List";
import MobileSearchBox from "@/components/MobileSearchBar/MobileSearchBox";
import MenPage from "@/components/men/MenPage";
import React from "react";

const page = () => {
  return (
    <>
      <MobileSearchBox />
      <MenPage heading="Kitchen Section" />
    </>
  );
};

export default page;
