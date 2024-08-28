import { STRIPE_SECRET_KEY } from "../Config/config.js";
import orderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(STRIPE_SECRET_KEY);
const frontendUrl = "http://localhost:5174";

const placeOrder = async (req, res) => {
  try {
    // Create a new order in the database
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    
    await newOrder.save();
    // Prepare line items for the Stripe session
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "pkr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Price in smallest currency unit (e.g., cents)
      },
      quantity: item.quantity,
    }));
    
    // Add delivery charge as a line item
    line_items.push({
      price_data: {
        currency: "pkr",
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: 5 * 100 * 278, 
      },
      quantity: 1,
    });
    
    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
    });
    
    // Return the session URL to the frontend
    res.json({
      success: true,
      data: session,
      message: "Order Placed Successfully",
      sessionUrl: session.url,
    });
  } catch (error) {
    // Return an error response
    res.status(400).json({
      success: false,
      message: "Error Placing Order heere",
    });
  }
};

const varifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success) {

      const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { payment: true });

      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
       
      })
      }
      await UserModel.findByIdAndUpdate(req.userId, { cartData: {} });
      res.json({
        success: true,
        message: "Order Payment Confirmed",
        orderId:orderId,
      });
    } else {
      await orderModel.findByIdAndUpdate(orderId, { payment: false });
      res.json({
        success: true,
        message: "Order Payment Not Confirmed",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      

      message: "Error Placing Order here",
    });
  }
}

const userOrder = async (req,res) =>{
    try {
      const orders = await orderModel.find({userId:req.userId});
      if(!orders){
        res.status(400).json({
          success: false,
          message: "No Orders Found for this user"
        })
      }
      res.status(200).json({
        success: true,
        data:orders,
        message: "Orders Found",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error Finding Orders here",
      });
      
    }
}

const listOrders = async(req,res) => {
     try {
       const orders = await orderModel.find({});
       if(!orders){
         res.status(400).json({
           success: false,
           message: "No Orders Found"
         })
       }
       res.status(200).json({
         success: true,
         data:orders,
         message: "Orders Found",
       });
     } catch (error) {
      res.status(400).json({
        success: false,
         message: "Error Finding Orders here",
      })
     }
}

//api for updatin user status 

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params; // Adjusted to match the route parameter
    const { status } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(id, { status: status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found or user doesn't have an order yet",
      });
    }

    res.json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating order status",
    });
  }
};
export  {placeOrder,varifyOrder,userOrder,listOrders,updateStatus};
