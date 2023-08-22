import { Inter } from "next/font/google";



const inter = Inter({ subsets: ["latin"] });
//psql connection
export const metadata = {
  title: "Edit User Info",
  description: "User Information Page",
};
export default function EditUserLayout({ children }) {
  return (
    < >
      {/* <head /> */}
     {children}
    </>
  );
}
