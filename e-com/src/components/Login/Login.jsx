"use client";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import pic from "../../images/shp.png";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  //console.log(isLoading)
  const [selectedOption, setSelectedOption] = useState("buyer"); // Default selected option

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const [error, seterror] = useState(null);
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading === false) {
      //console.log('Hi')
      setisLoading(true);
      const data = {
        email: e.target[0].value,
        password: e.target[1].value,
        isSeller: selectedOption
      };
      //console.log(e.target[0].value ,e.target[1].value)
      const response = await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
     // console.log(await response.json())      
      const r = await response.json()
      console.log(r)
      setisLoading(false);
      //console.log(r)
      if (r.result === "success") {
        e.target.reset();

        localStorage.setItem("user", JSON.stringify(r.data));
        seterror({ message: r.message, color: "green" });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        seterror({ message: r.message, color: "red" });
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      seterror(null);
    }, 2000);
  }, [error]);
  return (
    <div
      className={`min-w-[99vw] min-h-[100vh] py-6 flex flex-col  items-center bg-[#d6d5d5]`}
    >
      <form
        action=""
        className={`${
          isLoading ? "opacity-50" : ""
        } flex justify-evenly  flex-col items-center border-[1px] bg-[white] border-[grey] ${
          styles.temp
        } ${styles.temp2} h-[400px]`}
        onSubmit={handleSubmit}
      >
        <Image
          src={pic}
          alt="Logo"
          className={`${styles.image} bg-[#d6d5d5] w-[100px] h-[100px]`}
        />
        <div className="relative w-[80%] mb-2">
          <input
            type="email"
            className="w-[100%] border-[1px] border-[grey] h-[45px] placeholder:text-[#5c5c5c] pl-2"
            id="email"
            placeholder="Email address*"
            required
            name="email"
          />
        </div>
        <div className="relative w-[80%] mb-2">
          <input
            type="password"
            className="w-[100%] border-[1px] border-[grey] h-[45px] placeholder:text-[#5c5c5c] pl-2"
            id="password"
            placeholder="Password*"
            required
            name="password"
          />
        </div>
        <div className="relative w-[80%] flex flex-col justify-between ">
          <p className=" w-[100%]">Login as:</p>
          <div className="flex flex-row justify-around mt-2">
            <div>
              <label className="">
                <input
                  type="radio"
                  value="buyer"
                  checked={selectedOption === "buyer"}
                  onChange={handleOptionChange}
                />
                Buyer
              </label>
            </div>
            <div>
              <label>
                <input
                  className=""
                  type="radio"
                  value="seller"
                  checked={selectedOption === "seller"}
                  onChange={handleOptionChange}
                />
                Seller
              </label>
            </div>
          </div>
        </div>
        <div
          className={`h-[20px] w-[100%] flex items-center font-bold justify-center ${
            error && error.message === "Welcome back"
              ? "text-[green]"
              : "text-[red]"
          }`}
        >
          {error ? error.message : ""}
        </div>
        <button
          type="submit"
          className={`w-[80%]   bg-[rgb(0,94,255)]  uppercase text-white shadow-[0_4px_9px_-4px_#3b71ca] h-[45px] ${
            isLoading ? "flex justify-center items-center " : ""
          }`}
        >
          {isLoading ? (
            <CircularProgress
              color="secondary"
              sx={{ my: "5px", color: "red" }}
            />
          ) : (
            "Login"
          )}
        </button>
        <p
          className="   hover:bg-[#c2c2c2] hover:text-[black]  border-dashed p-2 cursor-pointer transition duration-2000 ease-in-out font-semibold"
          onClick={handleClick}
        >
          Sign Up
        </p>
      </form>
    </div>
  );
};

export default Login;
