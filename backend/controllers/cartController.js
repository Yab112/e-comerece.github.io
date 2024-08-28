import UserModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  const { itemId, quantity } = req.body;

  try {
    const user = await UserModel.findById(req.userId);

    if (user) {
      if (user.CartData.has(itemId)) {
        const newQuantity = quantity > 0 ? user.CartData.get(itemId) + quantity : user.CartData.get(itemId) + 1;
        user.CartData.set(itemId, newQuantity);
      } else {
        user.CartData.set(itemId, quantity > 0 ? quantity : 1);
      }
      await user.save();
      res.status(200).json({ message: 'Item added to cart' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const removeFromCart = async (req, res) => {
  const { itemId } = req.body;
  const { id } = req.params;
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    let cartData = user.CartData;

    if (!cartData.has(id)) {
      return res.status(400).json({
        success: false,
        message: "Product not found in cart",
      });
    } else {
      cartData.set(id, cartData.get(id) - 1);
      if (cartData.get(id) === 0) {
        cartData.delete(id);
      }
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      cart: user.CartData, // Ensure this matches the frontend's expectation
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};

const deleteAllOrderOfItem = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    let cartData = user.CartData;

    if (!cartData.has(id)) {
      return res.status(400).json({
        success: false,
        message: "Product not found in cart",
      });
    } else {
      cartData.delete(id);
      console.log("cartData:", cartData);
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteAllOrder = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    let cartData = user.CartData;

    cartData.clear();
    await user.save();

    res.status(200).json({
      success: true,
      message: "All items removed from cart successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { addToCart, removeFromCart, getCart, deleteAllOrderOfItem, deleteAllOrder };
