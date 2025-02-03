import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const adminData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/login`,
        adminData
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate("/admin-home");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="w-full h-screen relative overflow-hidden font-sans">
        <img
          className="absolute top-0 left-0 h-28"
          src="./src/assets/images/pu-logo.png"
          alt="pu-logo"
        />
        <div className="w-full h-2/3 flex flex-col justify-evenly items-center gap-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-full h-1/4 flex justify-center items-center">
            <h1 className="text-5xl text-center font-semibold tracking-tighter">
              Admin Login
            </h1>
          </div>
          <div className="w-full h-3/4">
            <form onSubmit={submitHandler} className="flex flex-col justify-center items-center gap-10">
              <h5 className="flex justify-center items-center border-b-[1.5px] border-black">
                <i className="ri-user-3-line border-none"></i>
                <input
                  className="px-4 py-2 text-lg outline-none"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </h5>
              <h5 className="flex justify-center items-center border-b-[1.5px] border-black">
                <i className="ri-lock-unlock-line border-none"></i>
                <input
                  className="px-4 py-2 text-lg outline-none"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </h5>
              <button
                type="submit"
                className="flex items-center justify-center w-1/3 bg-black text-white py-3 mt-5"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
