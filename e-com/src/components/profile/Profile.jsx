"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  BsReverseListColumnsReverse,
  BsFillPencilFill,
  BsFillBagCheckFill,
  BsFillCartCheckFill,
} from "react-icons/bs";
import {BiSolidShoppingBagAlt} from "react-icons/bi"
import ProfileEdit from "../ProfileEdit.jsx/ProfileEdit";
import styles from "../../styles/profileEdit.module.css"
import TabPanel from "../Tabpanel/TabPanel";


const Profile = () => {
  const [userInfo, setuserInfo] = useState({});

  useEffect(() => {
    setuserInfo(JSON.parse(localStorage.getItem("user")));
  }, [typeof window !== "undefined"]);
  //console.log(userInfo)
  const router = useRouter();
  const handleAddProduct = (e) => {
    e.preventDefault();
    router?.push("/addProduct");
  };

  const handleEditInfo = (e) => {
    e.preventDefault();
    router?.push("/editinfo");
  };
  //console.log(userInfo);
  return (
    <div className="h-[100vh] w-[100%] ">
      <div className="w-[100%] flex justify-center text-[40px] font-bold text-[#ff6200]">
        Shop Y
      </div>
      <div className="flex items-center justify-center ">
        <BiSolidShoppingBagAlt
        className="text-[red]"
        />{" "}
        <span className="text-[16px] font-bold">Online Store</span>
      </div>
      <div className={`${styles.widgetParent} ${styles.widgetParent1} w-[100%] bg-[] `}>
        <ProfileEdit />
        <TabPanel />
      </div>
    </div>
  );
};

export default Profile;
