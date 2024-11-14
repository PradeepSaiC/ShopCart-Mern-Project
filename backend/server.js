import express from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
import { connectDB } from "./config/db.js";
import productRouter from "./routes/products.routes.js";

const app = express();
app.use(express.json());
const __dirname = path.resolve()
app.use("/api/products",productRouter);
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")))

    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    })
}
app.listen(process.env.PORT || 4000,()=>{
    connectDB();
    console.log("Server started at localhost 5000");
})