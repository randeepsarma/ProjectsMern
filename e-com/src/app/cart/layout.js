
import { Inter } from "next/font/google";
import { Fragment } from "react";


const inter = Inter({ subsets: ["latin"] });
//psql connection
export const metadata = {
  title: "Cart",
  description: "Cart",
};
export default function CartLayout({ children }) {
  return (
    <Fragment >
    
     {children}
   
    </Fragment>
  );
}
