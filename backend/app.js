import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import morgan from'morgan';
import { PORT } from "./Config/config.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();
const app = express();
const port = PORT || 4000;
app.use(cors());
app.use(express.json())
app.use(morgan("dev"))
app.use('/Image',express.static('uploads')) // can render every uploaded images
app.use("/api/cart", cartRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
export default app;