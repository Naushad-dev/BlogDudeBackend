const express= require('express');
const morgan= require('morgan');
const cors= require('cors');
const DB_connection = require('./config/db_connection');


const dotenv=require('dotenv').config()
const app= express();
const port=process.env.PORT;

//DB_connection

DB_connection()

//injecting middleware

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//routes

const userRoutes= require("./routes/user.routes");
const postRoutes= require("./routes/post.routes");

app.use("/api/v1/",userRoutes);
app.use("/api/v1/",postRoutes);

//default routes

app.get("/",(req,res)=>{

    res.status(200).send({
        status:"success",
        message:"Welcome to BlogDudeApp"
    });

})





app.listen(port,()=>{
    console.log(`Server started successfully at port ${port}`);
})