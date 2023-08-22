//"use client"
import AWS from 'aws-sdk';
//import { useState } from 'react';
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
//import styles from "./page.module.css"



export const uploadFunct=async(file)=>{
  //console.log(file)
 
  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
    region: 'ap-south-1',
    signatureVersion: 'v4',
  });
  const s3 = new AWS.S3();
    if (!file) {
      return;
    }
  const params = { 
    Bucket: process.env.NEXT_PUBLIC_BUCKET_DP, 
    Key: `${Date.now()}.${file.name}`, 
    Body: file 
  };
  const { Location } = await s3.upload(params).promise();  
  
  return Location

}
export const handleDelete=async(url)=>{

  let arr=url.split("/")
  //console.log(arr)
 
  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
    region: 'ap-south-1',
    signatureVersion: 'v4',
  });

  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET_DP,
    Key: `${arr[arr.length-1]}`,
  };
  //console.log(params) 
  s3.deleteObject(params, (error, data) => {
    if (error) {
      console.error('Error deleting phoho:', error);
    } else {
      //console.log('Photo deleted successfully');
    }
  }); 
}
