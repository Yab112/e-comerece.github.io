import express from 'express';
import { addToCart,removeFromCart,getCart,deleteAllOrderOfItem,deleteAllOrder } from '../controllers/cartController.js';
import authMiddlewere  from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/',authMiddlewere, addToCart);
cartRouter.get('/',authMiddlewere, getCart);
cartRouter.delete('/:id/all',authMiddlewere, deleteAllOrderOfItem);
cartRouter.delete('/all',authMiddlewere, deleteAllOrder);
cartRouter.delete('/:id',authMiddlewere, removeFromCart);

export default cartRouter;
