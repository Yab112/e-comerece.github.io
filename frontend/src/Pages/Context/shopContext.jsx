import { createContext, useState, useEffect } from "react";
import axios from "axios";
import hero from "../../assets/bg.png";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cardItems, setCardItems] = useState({});
  const [Showlogin, setShowlogin] = useState(false);
  const [showDialogforDelete, setShowDialogforDelete] = useState(false);
  const [bgImage, setbgImage] = useState(hero);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showLoginbutton, setShowLoginbutton] = useState(true);
  const [all_products, setAll_products] = useState([]);

  const url = "http://localhost:3000";

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setShowlogin(false);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setShowLoginbutton(true);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // console.log("Token detected, loading cart data.*************************************************");
      setToken(storedToken);
      loadCartData(storedToken);
    }
    fetchProductList();
  }, []);

  const addtocart = async (itemId,quantity = 0) => {
    setCardItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + (quantity > 0 ? quantity : 1),
    }));
    if (token) {
      try {
         const response = await axios.post(`${url}/api/cart`, { itemId ,quantity}, {
           headers: {
             token,
           },
         });
       
        console.log("Add to cart response:", response.data); // Log the response
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCardItems((prev) => {
      const newItems = { ...prev };
      if (newItems[itemId]) {
        newItems[itemId] -= 1;
        if (newItems[itemId] <= 0) {
          delete newItems[itemId];
        }
      }
      return newItems;
    });
    if (token) {
      try {
        const response = await axios.delete(`${url}/api/cart/${itemId}`, {
          headers: {
            token,
          },
        });
        console.log("Remove from cart response:", response.data); // Log the response
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const getObjectLength = () => {
    return Object.keys(cardItems).length;
  };

  const deleteAllOrder = async (itemId) => {
    setCardItems((prev) => {
      const newItems = { ...prev };
      delete newItems[itemId];
      return newItems;
    });
    if (token) {
      try {
        const response = await axios.delete(`${url}/api/cart/${itemId}/all`, {
          headers: {
            token,
          },
        });
        console.log("Delete item response:", response.data); // Log the response
      } catch (error) {
        console.error("Error deleting item from cart:", error);
      }
    }
  };

  const clearAllOrders = async () => {
    setCardItems({});
    if (token) {
      try {
        const response = await axios.delete(`${url}/api/cart/all`, {
          headers: {
            token,
          },
        });
        console.log("Clear all orders response:", response.data); // Log the response
      } catch (error) {
        console.error("Error clearing all orders:", error);
      }
    }
  };

  const fetchProductList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`);
      if (response.data.success) {
        setAll_products(response.data.products);
        // console.log("Fetched products:", response.data.products); 
      } else {
        console.error("Unexpected data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const loadCartData = async () => {
    try {
      const response = await axios.get(`${url}/api/cart`, {
        headers: {
          token,
        },
      });
      // console.log("API Response for cart data:", response.data); // Log the response
      if (response.data.success) {
        setCardItems(response.data.cart);
      } else {
        console.error("Failed to load cart data:", response.data.message);
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };


  // useEffect(() => {
  //   console.log("Updated cardItems:", cardItems);
  // }, [cardItems]);

  const contextValue = {
    all_products,
    cardItems,
    setCardItems,
    addtocart,
    removeFromCart,
    getObjectLength,
    Showlogin,
    setShowlogin,
    deleteAllOrder,
    clearAllOrders,
    showDialogforDelete,
    setShowDialogforDelete,
    bgImage,
    setbgImage,
    token,
    login,
    logout,
    url,
    showLoginbutton,
    setShowLoginbutton,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
