import { connectPostgress } from "@/utils/db"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { createJWT } from "@/utils/auth"
import jwt from "jsonwebtoken";
export const POST =async(req)=>{
   
    const {email,password,isSeller}= await req.json()
   
    const text =`select * from users where email = $1 and isseller = $2`
    const params = [email,isSeller==="seller"];
    //db 
    
    const result = await connectPostgress(text,params)
    if(result.rows.length==0){
        
        try {
            
            return new NextResponse(JSON.stringify({
                result:"failed",
                message:"No user found"
            }))
        } catch (error) {
            return new NextResponse(JSON.stringify({
                result:"failed",
                message:error.message
            }))
        }
        
    }
    const isMatch = await bcrypt.compare(password,result.rows[0].password)
    
    if(!isMatch){
        try {
            return new NextResponse(JSON.stringify({
                result:"failed",
                message:"Wrong Password"
            }))    
        } catch (error) {
            return new NextResponse(JSON.stringify({
                result:"failed",
                message:error.message
            }))
        }
        
    }
    //console.log(result.rows[0])
    try {
        //console.log(process.env.DATABASE_URL)
        
        const data = {
            id:result.rows[0].id,
            name:result.rows[0].name,
            email:result.rows[0].email,
            img:result.rows[0].img,
            desc:result.rows[0].description,
            isSeller:result.rows[0].isseller,
            cart:result.rows[0].cart,
            createdAt:result.rows[0].created_at
            
        }
        //console.log(result.rows[0])
        const tokenData = {
            id:result.rows[0].id,
            username:result.rows[0].name,
            email:result.rows[0].email
        }
        const tkn = jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:"1d"})//await createJWT(data)
        //console.log(data)
        const res =  new NextResponse(JSON.stringify({
            result:"success",
            message:"Welcome back",
            data
        }),{
            status:200,
        })
        res.cookies.set("token",tkn,
        {
            httpOnly:true,
            path:"/"
        })
        return res
    } catch (error) {
        return new NextResponse(JSON.stringify({
            result:"failed",
            message:error.message
        }),{
            status: 500
        })       
    }    
}