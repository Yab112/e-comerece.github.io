import express from "express";
import authMiddleware from "../middleware/auth.js";
import {placeOrder,varifyOrder,userOrder,listOrders,updateStatus} from "../controllers/orderController.js";
import orderModel from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.post("", authMiddleware, placeOrder);
orderRouter.post("/verify", authMiddleware, varifyOrder);
orderRouter.get("/list",listOrders);
orderRouter.get("", authMiddleware, userOrder);
orderRouter.put("/update/:id", updateStatus);


export default orderRouter;