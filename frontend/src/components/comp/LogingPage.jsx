import { useState, useContext } from "react";
import { FaXmark } from "react-icons/fa6";
import { ShopContext } from "../../Pages/Context/shopContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [state, setState] = useState("Login");
  const { setShowlogin, url, login } = useContext(ShopContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state === "Login") {
      await onLogin();
    } else {
      await onRegister();
    }
  };

  const onLogin = async () => {
    try {
      const response = await axios.post(`${url}/api/user/login`, {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        login(response.data.token);  
        toast.success("Login successful!");
        setShowlogin(false); 
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    }
  };

  const onRegister = async () => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/user/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setState("Login");  
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{state}</h2>
          <button
            onClick={() => setShowlogin(false)}
            className="text-xl"
          >
            <FaXmark />
          </button>
        </div>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {state === "Register" && (
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                className="w-full border-gray-300 rounded-md border p-2"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              className="w-full border-gray-300 rounded-md border p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              className="w-full border-gray-300 rounded-md border p-2"
              required
            />
          </div>
          {state === "Register" && (
            <div>
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={onChangeHandler}
                className="w-full border-gray-300 rounded-md border p-2"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            {state}
          </button>
          <div className="flex justify-center mt-2">
            <button
              type="button"
              onClick={() => setState(state === "Login" ? "Register" : "Login")}
              className="text-blue-500"
            >
              {state === "Login" ? "Create an Account" : "Already have an account?"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
