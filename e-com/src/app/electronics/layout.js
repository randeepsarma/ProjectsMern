import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Inter } from "next/font/google";
import { Fragment } from "react";


const inter = Inter({ subsets: ["latin"] });
//psql connection
export const metadata = {
  title: "Electronics",
  description: "Electronics",
};
export default function ElectronicsLayout({ children }) {
  return (
    <Fragment >
    
     {children}
   
    </Fragment>
  );
}
