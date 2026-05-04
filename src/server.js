import express from "express";
import bodyParser from "body-parser";

import initWebRoutes from "./route/web.js";
import configViewEngine from "./config/viewEngine.js";
import dotenv from "dotenv";


import connectDB from "./config/connectDB.js";
dotenv.config();

let app = express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
initWebRoutes(app);

connectDB();

let port =process.env.PORT || 8081;

app.listen(port,()=>{
    console.log("Backend Nodejs is running on the port : " + port);
});