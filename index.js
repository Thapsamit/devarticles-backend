import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import articles from './routes/articles.js'
import dotenv from 'dotenv'
import users from './routes/users.js'
const app = express()
dotenv.config()
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.use('/articles',articles)
app.use('/users',users);
app.get('/',(req,res)=>{
    res.send('Welcome to devarticles')
})
const CONNECTIONURL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000
mongoose.connect(CONNECTIONURL)
.then(()=>{
    console.log("Database Connected....")
    app.listen(PORT,()=>{
        console.log("Server Runnning on PORT = "+PORT)
    })
})
.catch((err)=>{
    console.log(err)
    console.log("Error in connecting  to database")
})