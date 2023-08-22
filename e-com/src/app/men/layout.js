import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Inter } from "next/font/google";
import { Fragment } from "react";


const inter = Inter({ subsets: ["latin"] });
//psql connection
export const metadata = {
  title: "Men's Wear",
  description: "Men's Section",
};
export default function MenLayout({ children }) {
  return (
    <Fragment >
     
     {children}
     
    </Fragment>
  );
}
