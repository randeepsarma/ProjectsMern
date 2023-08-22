import { SignJWT, jwtVerify } from "jose";

export const createJWT =(user)=>{

    //In JavaScript, Date.now() returns the current timestamp as the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC.
    //Dividing Date.now() by 1000 is a common practice to convert the timestamp from milliseconds to seconds. This is because many systems or APIs use timestamps in seconds rather than milliseconds.
    const iat = Math.floor(Date.now() /1000)
    //7 days    
    const exp = iat + 60 * 60 * 60 * 24 * 7;

    return new SignJWT({
            payload :
            {
                id: user.id,
                email: user.email
            }
        }).setProtectedHeader({
            alg:"HS256" ,type:"JWT"
        }).setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}
export const validateJWT = async(jwt) =>{
    try {
        const {payload} = await jwtVerify(
            jwt,
            new TextEncoder().encode(process.env.JWT_SECRET)
        )
        return payload.payload
    } catch (error) {
        throw{ 
            error : error,
            message: "Validation failed"
        }
    }
}

