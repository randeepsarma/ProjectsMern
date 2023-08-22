import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Inter } from "next/font/google";
import { Fragment } from "react";


const inter = Inter({ subsets: ["latin"] });
//psql connection
export const metadata = {
  title: "Women's Wear",
  description: "Women's Section",
};
export default function WomenLayout({ children }) {
  return (
    <Fragment >
    
     {children}
   
    </Fragment>
  );
}
