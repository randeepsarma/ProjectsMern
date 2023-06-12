import { v2 as cloudinary } from 'cloudinary'
export const destroyImage =async(url)=>{
    
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
