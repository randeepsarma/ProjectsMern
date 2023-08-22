import { Inter } from "next/font/google";
import { Fragment } from "react";


const inter = Inter({ subsets: ["latin"] });
//psql connection
export const metadata = {
  title: "Profile",
  description: "Profile Page",
};
export default function ProfileLayout({ children }) {
  return (
    < >
      {/* <head /> */}
     {children}
    </>
  );
}
