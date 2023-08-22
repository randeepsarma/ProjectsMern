"use client";
import Image from "next/image";

import React, { useEffect, useState, useClient } from "react";
import pic from "../../images/shp.png";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

import CircularProgress from "@mui/material/CircularProgress";

import { handleDelete, uploadFunct } from "@/utils/awsUpload";

const Register = () => {
  const [isLoading, setisLoading] = useState(false);
  //console.log(isLoading)
  const [selectedOption, setSelectedOption] = useState("buyer"); // Default selected option

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const [error, seterror] = useState(null);
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/login");
  };
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    event.preventDefault();

    const files = Array.from(event.target.files);

    if (files.length > 0 && isLoading === false) setSelectedFiles(files);
  };
  const handleForm = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    //console.log('Hi')
    //setisLoading(true)
    if (isLoading === false) {
      if (e.target[2].value.length < 8) {
        seterror({ message: "Minimum Password Length : 8", color: "red" });
        return;
      }

      setisLoading(true);
      //console.log('enter')
      let url = await uploadFunct(selectedFiles[0]);
      //console.log('leave')

      const arr = e.target[0].value.split(" ");
      //console.log(e)
      const actualData = {
        name: arr[0] + " " + arr[1],
        email: e.target[1].value,
        password: e.target[2].value,
        file: url,
        description: selectedOption === "buyer" ? "" : e.target[6].value,
        status: selectedOption === "seller" ? true : false,
      };

      //console.log(actualData)
      const res = await fetch(`http://localhost:3000/api/register`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(actualData),
      });

      const newUser = await res.json();
      //console.log(newUser)
      setisLoading(false);
      if (newUser.message === "failed") {
        await handleDelete(url);
        seterror({ message: "User exists", color: "red" });
      } else {
        seterror({ message: "Welcome Aboard", color: "green" });
        e.target.reset();
        setSelectedFiles([]);
        setTimeout(() => {
          router?.push("/login");
        }, 3000);
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
      className={` box-border py-6 min-h-[100vh] min-w-[99vw] flex flex-col  items-center bg-[#d6d5d5]`}
    >
      <form
        action=""
        className={`${
          isLoading ? "opacity-50" : ""
        } justify-evenly flex flex-col   items-center border-[1px] bg-[white] border-[grey] ${
          styles.temp
        } ${styles.temp2}`}
        onSubmit={handleForm}
      >
        <Image
          src={pic}
          alt="Logo"
          className={`${styles.image} bg-[#d6d5d5] w-[100px] h-[100px] `}
        />

        <div className="relative w-[80%] mb-2">
          <label htmlFor="name" className="font-semibold"></label>
          <input
            type="text"
            className={`w-[100%] border-[1px] border-[grey] h-[45px] placeholder:text-[#5c5c5c] pl-2`}
            id="name"
            placeholder="Name*"
            name="name"
            required
          />
        </div>
        <div className="relative w-[80%] mb-2">
          <label htmlFor="email" className="font-semibold"></label>
          <input
            type="email"
            className="w-[100%] border-[1px] border-[grey] h-[45px] placeholder:text-[#5c5c5c] pl-2"
            id="email"
            placeholder="Email address*"
            name="email"
            required
          />
        </div>
        <div className="relative w-[80%] mb-2">
          <label htmlFor="password" className="font-semibold"></label>
          <input
            type="password"
            className="w-[100%] border-[1px] border-[grey] h-[45px] placeholder:text-[#5c5c5c] pl-2"
            id="password"
            placeholder="Password*"
            name="password"
            required
          />
        </div>
        <div className="relative w-[80%] mb-2 flex flex-row justify-between items-center">
          <label
            htmlFor="fileInput"
            className="text-[12px] cursor-pointer bg-blue-500 hover:bg-blue-600 flex justify-center items-center text-white w-[40%] h-[40px] rounded"
          >
            Choose File
          </label>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            name="fileInput"
          />
          <div className="mt-2  w-[90px] h-[90px] border-2 border-dashed border-black">
            {selectedFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="file-preview-image h-[100%] w-[100%]"
              />
            ))}
          </div>
        </div>
        <div className="relative w-[80%] flex flex-row justify-between ">
          <p>Become:</p>
          <div>
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
                  className="mt-2 "
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
        {selectedOption === "buyer" ? (
          <></>
        ) : (
          <div className="relative w-[80%] mb-2">
            <label htmlFor="description" className="font-semibold"></label>
            <textarea
              type="text"
              className="w-[100%] border-[1px] border-[grey] h-[100px] placeholder:text-[#5c5c5c] pt-2 pl-2 resize-none"
              id="description"
              placeholder="Description*"
              name="description"
              required
            />
          </div>
        )}

        <div
          className={`h-[30px] w-[100%] flex items-center font-bold justify-center ${
            error && error.message === "Welcome Aboard"
              ? "text-[green]"
              : "text-[red]"
          }`}
        >
          {error ? error.message : ""}
        </div>
        <button
          type="submit"
          className={`w-[80%]   bg-[rgb(0,94,255)]  uppercase text-white shadow-[0_4px_9px_-4px_#3b71ca] h-[50px]  mb-2 ${
            isLoading ? "flex justify-center items-center " : ""
          }`}
        >
          {isLoading ? (
            <CircularProgress
              color="secondary"
              sx={{ my: "5px", color: "red" }}
            />
          ) : (
            "Register"
          )}
        </button>
        <p
          className="   hover:bg-[#c2c2c2] hover:text-[black]   p-2 cursor-pointer transition duration-2000 ease-in-out font-semibold mb-2"
          onClick={handleClick}
        >
          Sign In
        </p>
      </form>
    </div>
  );
};

export default Register;
