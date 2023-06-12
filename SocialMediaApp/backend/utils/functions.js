import { v2 as cloudinary } from 'cloudinary'
export const destroyImage =async(url)=>{
   cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.Cloud_api_key,
  api_secret: process.env.api_secret
});
    const urlArray = url.split('/')
    const image = urlArray[urlArray.length - 2] + "/" + urlArray[urlArray.length - 1]

    const imageName = image.split('.')[0];

    await cloudinary.uploader.destroy(imageName, (error, result) => {
       try{
       return result   
       }catch(error){
       return error
       }
    })
}
