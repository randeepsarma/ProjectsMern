"use client";
import Image from "next/image";
import React, { useState } from "react";
import mens2 from "../../images/mens2.jpg";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import styles from"./list.module.css"
const List = () => {
  const [check, setcheck] = useState(false);
  const handleMouseOver = (e) => {
    e.preventDefault;
    setcheck(true);
    console.log("Hi");
  };
  const handleMouseLeave = (e) => {
    e.preventDefault();
    setcheck(false);
    console.log("Bye");
  };
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2
    lg:grid-cols-3  grid-flow-row w-[100%] justify-items-center"
    >
      <div className="Card w-[80%] lg:w-[65%]   m-4  bg-opacity-50  cursor-pointer hover:scale-[104%] transition duration-500 ease-in-out ">
        <Image
          className="m-auto w-[100%] h-[330px] lg:h-[380px] box-border hover:opacity-8 hover:bg-opacity-50"
          src={mens2}
          alt={`Slide`}
        />

        <div className="bg-[] box-border border-[0.8px] border-[#b6b6b6]  w-[100%] ">
          <p className="text-[20px] font-semibold ml-[8px] mt-[10px]">
            Rs 1299
          </p>
          <div className="Rating flex flex-row items-center pl-[8px]">
            <p>4.4</p>
            <div className="flex flex-row ml-[5px] text-[#ff7f23]">
              <BsStarFill className={``} />
              <BsStarFill />
              <BsStarHalf />
              <BsStar />
              <BsStar />
            </div>
          </div>
          <div className="pl-[8px]">
            <span>Reviews</span>
            <span>(4.4K+)</span>
          </div>
          <p className="text-[25px] mb-[15px] ml-[8px]">
            Jeans Shirt & Pant Pair
          </p>
        </div>
      </div>
      <div className="Card w-[80%] lg:w-[65%]   m-4  bg-opacity-50  cursor-pointer hover:scale-[104%] transition duration-500 ease-in-out ">
        <Image
          className="m-auto w-[100%] h-[330px] lg:h-[380px] box-border hover:opacity-8 hover:bg-opacity-50"
          src={mens2}
          alt={`Slide`}
        />

        <div className="bg-[] box-border border-[0.8px] border-[#b6b6b6]  w-[100%] ">
          <p className="text-[20px] font-semibold ml-[8px] mt-[10px]">
            Rs 1299
          </p>
          <div className="Rating flex flex-row items-center pl-[8px]">
            <p>4.4</p>
            <div className="flex flex-row ml-[5px] text-[#ff7f23]">
              <BsStarFill className={``} />
              <BsStarFill />
              <BsStarHalf />
              <BsStar />
              <BsStar />
            </div>
          </div>
          <div className="pl-[8px]">
            <span>Reviews</span>
            <span>(4.4K+)</span>
          </div>
          <p className="text-[25px] mb-[15px] ml-[8px]">
            Jeans Shirt & Pant Pair
          </p>
        </div>
      </div>
     
     
      
    </div>
  );
};

export default List;
