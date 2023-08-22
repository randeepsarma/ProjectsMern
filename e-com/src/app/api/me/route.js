import { getDataFromToken } from "@/mdl/route";
import { connectPostgress } from "@/utils/db";


export const GET= async(request)=>{

    try {
        const userID = await getDataFromToken(request)
        const text =`SELECT * from users where id = $1`
        const params = [userID]
        const result = await connectPostgress(text,params)

        return new NextResponse(JSON.stringify({
            result:"success",
            message:"User found",
            data:result.rows[0]
        }))  

    } catch (error) {
        return new NextResponse(JSON.stringify({
            result:"failed",
            message:error.message
        }),{
            status: 500
        })  
    }
}