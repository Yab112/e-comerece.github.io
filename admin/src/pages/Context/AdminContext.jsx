

import React, { createContext, useState } from 'react';


export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  const url = "http://localhost:3000"
  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
  };
  const [data,setData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Men',
  });

  const onChangeHandler =(e)=>{
    const name = e.target.name
    const value = e.target.value
    setData((data) =>({...data, [name]: value}))
  }

  return (
    <AdminContext.Provider value={{ image, handleImageChange, removeImage,data,setData,onChangeHandler,setImage,url }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
