
export const baseUrl = process.env.REACT_APP_BACKEND 

export const month = {
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Apr": 4,
    "May": 5,
    "Jun": 6,
    "Jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12
}

export const uploadFile = async(file,folder)=>{
    
    const data = new FormData()
    data.append("file",file)
    data.append("upload_preset",folder)
    data.append("cloud_name","der99pbsq")

    const res =await  fetch("https://api.cloudinary.com/v1_1/der99pbsq/image/upload",{
        method:"post",
        body:data
    })
    return await res.json()

}

export const destroyPhoto = async(url)=>{
    if (url) {
        
        const urlArray = url.split('/')
        const image = urlArray[urlArray.length - 2] + "/" + urlArray[urlArray.length - 1]

        const imageName = image.split('.')[0];
        return imageName
      
    }
}