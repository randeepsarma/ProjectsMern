import axios from 'axios'
export const upload = async (file) => {
    const data = new FormData()
    data.append("file", file);
    data.append("upload_preset", "fiverr")

    try {
        const res = await axios.post("https://api.cloudinary.com/v1_1/der99pbsq/image/upload", data)
        console.log(res)
        const { url } = res.data
        return url
    } catch (error) {
        console.log(error)
    }
}