import { Inter } from "next/font/google";
import { Fragment } from "react";


const inter = Inter({ subsets: ["latin"] });
//psql connection
export const metadata = {
  title: "Login",
  description: "Login Page",
};
export default function LoginLayout({ children }) {
  return (
    <Fragment >
      {/* <head /> */}
     {children}
    </Fragment>
  );
}
