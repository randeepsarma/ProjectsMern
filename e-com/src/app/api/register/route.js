import argon2 from "argon2";
import { NextResponse } from "next/server";

import bcrypt from "bcrypt";

import { connectPostgress } from "@/utils/db";

export const POST = async (req) => {
  const { name, email, password, file, description, status } = await req.json();
  //console.log(email,status)

  const text = "select * from users where email = $1 and isSeller = $2";
  const params = [email, status];

  const reqPer = await connectPostgress(text, params);
  if (reqPer.rows.length > 0) {
    
    return new NextResponse(
      JSON.stringify({
        message: "failed"
      })
    );
  }
  //console.log('Bro')

  //password ecryption
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const text =
      "INSERT INTO  users (name,email,cart,password,img,description,isSeller) values ($1,$2,$3,$4,$5,$6,$7)";
    const params = [name, email,[], hashPassword, file, description, status];
    const newUser = await connectPostgress(text, params);

    //console.log('hello')
    return new NextResponse(JSON.stringify({
        message:"success",
        
    }), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 404,
    });
  }
};
