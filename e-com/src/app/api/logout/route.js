import { NextResponse } from "next/server";


export const GET = async(req)=>{
   
    try {
        const res= new NextResponse(JSON.stringify({
            result:"success",
            message:"Logged out"
        })) 
        res.cookies.set("token","",
        {
            httpOnly:true,
            expires:new Date(0)
        })
        return res
    } catch (error) {
        return new NextResponse(JSON.stringify({
            result:"failed",
            message:error.message
        })) 
    }
}