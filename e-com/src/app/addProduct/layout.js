import { Inter } from "next/font/google";



const inter = Inter({ subsets: ["latin"] });
//psql connection
export const metadata = {
  title: "Add Product",
  description: "Add Product",
};
export default function AddProductLayout({ children }) {
  return (
    < >
      {/* <head /> */}
     {children}
    </>
  );
}
