"use client";
import React, { useState } from "react";
import pic from "../../images/shp.png";
import Image from "next/image";

const AddProduct = () => {
  const [tagText, setTagText] = useState("");
  const [tagArray, settagArray] = useState([]);
  const handleTag = (e) => {
    e.preventDefault();
    if(tagText!==""){
    settagArray((prev) => [...prev, tagText]);
    setTagText("");
    }
    
  };

  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileChange = (event) => {
    event.preventDefault();

    const files = Array.from(event.target.files);

    console.log(files)
    if (files.length === 3 /* && isLoading === false */){
      setSelectedFiles(files);
    }
  };
  const handleDeleteTag = (e, id) => {
    e.preventDefault();

    //let arr = tagArray.filter(item=>item===tagArray[id])
    settagArray((prev) => prev.filter((item) => item !== prev[id]));
  };
  //id,userId,productname,price,categories,description
  return (
    <div className="w-[100%] rounded-[15px]  bg-[#cbcbcb] ">
      <div
        className="w-[100%] h-[100%]  box-border  flex flex-col"
      >
        <div className="w-[80%] box-border  flex flex-col">
          <label htmlFor="productName" className="ml-[40px] mb-1 mt-1">
            Images*
          </label>

          <div className="pl-[40px] flex flex-col w-[100%] justify-between">
            <label
              htmlFor="fileInput"
              className="text-[12px] cursor-pointer bg-blue-500 hover:bg-blue-600 flex justify-center items-center text-white w-[100px] h-[40px] rounded"
            >
              Choose Files
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              multiple
              onChange={handleFileChange} 
              name="fileInput"
            />
            <div className="flex flex-row justify-between mt-4">
            {selectedFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="file-preview-image w-[30%]"
              />
            ))}
              
             
            </div>
          </div>
        </div>

        <div className="w-[80%] box-border  flex flex-col">
          <label htmlFor="productName" className="ml-[40px] mb-1 mt-1">
            Product Name*
          </label>
          <input
            type="text"
            className={`ml-[40px] w-[100%] border-[1px] border-[#5f5f5f] h-[40px] placeholder:text-[#5c5c5c] pl-2 rounded-[3px]`}
            id="productName"
            placeholder={`Eg : "Saree" or "Jeans"`}
            name="productName"
            required
          />
        </div>
        <div className="w-[80%] box-border  flex flex-col">
          <label htmlFor="price" className="ml-[40px] mb-1 mt-1">
            Price*
          </label>
          <input
            type="number"
            className={`ml-[40px] w-[100%] border-[1px] border-[#5f5f5f] h-[40px] placeholder:text-[#5c5c5c] pl-2 rounded-[3px]`}
            id="price"
            placeholder="Eg - Rs. 3000"
            name="price"
            required
          />
        </div>
        <div className="w-[50%] box-border  flex flex-col">
          <label htmlFor="stockNumber" className="ml-[40px] mb-1 mt-1">
            Stock Number*
          </label>
          <input
            type="number"
            className={`ml-[40px] w-[100%] border-[1px] border-[#5f5f5f] h-[40px] placeholder:text-[#5c5c5c] pl-2 rounded-[3px]`}
            id="stockNumber"
            placeholder="1,2,3...or 1000"
            name="stockNumber"
            required
          />
        </div>
        <div className="w-[80%] box-border  flex flex-col">
          <label htmlFor="price" className="ml-[40px] mb-1 mt-1">
            Category*
          </label>

          <input
            type="text"
            className={`ml-[40px] w-[100%] border-[1px] border-[#5f5f5f] h-[40px] placeholder:text-[#5c5c5c] pl-2 rounded-[3px]`}
            id="price"
            value={tagText}
            onChange={(e) => {
              e.preventDefault();
              setTagText(e.target.value);
            }}
            placeholder="mens,womens,home"
            name="price"
            required
          />
          <button
            type="button"
            onClick={handleTag}
            className="ml-[40px] mt-2 w-[70px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <span className="mr-1">+</span>
            Add
          </button>
          <div className="w-[100%] box-border pl-[40px] grid sm:grid-cols-3 grid-flow-row">
            {tagArray.map((item, id) => (
              <button
                onClick={(e) => handleDeleteTag(e, id)}
                key={id}
                type="button"
                className="w-fit flex flex-row justify-between text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mt-4"
              >
                <span className="text-black">{item}</span>
                <span className="ml-2">X</span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-[80%] box-border  flex flex-col">
          <label htmlFor="description" className="ml-[40px] mb-1 mt-1">
            Description*
          </label>
          <textarea
            className={`ml-[40px] w-[100%]  border-[1px] border-[#5f5f5f] h-[200px] placeholder:text-[#5c5c5c] pl-2 rounded-[3px] resize-none`}
            id="description"
            placeholder={`Eg : "Hand embroidered saree with silk"`}
            name="description"
            required
          />
        </div>
        <button className="bg-[#11b4ff] w-[120px] h-[50px] mt-[10px] mb-[10px] ml-[40px]  rounded-[10px]">Add Product</button>
      </div>
    </div>
  );
};

export default AddProduct;
