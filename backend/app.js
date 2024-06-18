// const express = require("express");  -- es5 version of node but her we will use es6 systax

import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";
dotenv.config()
const app= express();

//middlewares
app.use(express.json());

app.use("/user",userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

mongoose.connect(`mongodb+srv://abhiyodaya2002:${process.env.MONGODB_PASSWORD}@cluster0.ontrz4k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
    app.listen(5000,()=>{
        console.log("Connected to database and server is running");
    })
}).catch((err)=>{
    console.log(err,"errr");
});

