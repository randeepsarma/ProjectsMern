import { Inter } from "next/font/google";
import { Fragment } from "react";


const inter = Inter({ subsets: ["latin"] });
//psql connection
export const metadata = {
  title: "Register",
  description: "Register Page",
};
export default function RegisterLayout({ children }) {
  return (
    <Fragment >
      {/* <head /> */}
        {children}
    </Fragment>
  );
}
