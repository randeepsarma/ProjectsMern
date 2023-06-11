import express from 'express'

const app = express()
const port = 9000
app.use("/",(req,res)=>{
    res.json({"message":"Hello from express App"})
})


app.listen(port ,()=>{
    console.log(`Starting Server on port ${port}`)
})
