// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../Context/AuthContext";
// import { AiOutlineLogout } from "react-icons/ai";
// import api from "../config/api.config.js";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const { user, setUser, isLogin, setIsLogin } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const res = await api.get("/auth/logout");
//       sessionStorage.removeItem("UserData");
//       setIsLogin(false);
//       setUser(false);
//       navigate("/");
//       toast.success(res.data.message);
//     } catch (error) {
//       toast.error(
//         error.response.status + " | " + error.response?.data?.message ||
//           error.message,
//       );
//     }
//   };

//   return (
//     <>
//       <div className="bg-(--primary) text-lg text-(--primary-text) p-3 flex justify-between items-center">
//         <div>Cravings</div>

//         <div className="flex gap-4 items-center">
//           <Link to={"/"} className="hover:underline">
//             Home
//           </Link>
//           <Link to={"/contact-us"} className="hover:underline">
//             Contact us
//           </Link>
//           {isLogin ? (
//             <div className="border-s-2 flex justify-center items-center gap-4 px-4">
//               <div className="w-8 h-8 rounded-full overflow-hidden">
//                 <img
//                   src={user.photo}
//                   alt=""
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <Link
//                 to={"/user/dashboard"}
//                 className="hover:underline hover:text-(--accent)"
//               >
//                 {user.fullName}
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="text-red-300 hover:text-red-600"
//               >
//                 <AiOutlineLogout />
//               </button>
//             </div>
//           ) : (
//             <>
//               <Link
//                 to={"/login"}
//                 className="hover:underline hover:text-(--accent)"
//               >
//                 Login
//               </Link>
//               <Link to={"/register"} className="hover:underline">
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoLight from "../assets/carousel/transparentLogoLight.png";
import { useAuth } from "../Context/AuthContext";
import { FaPowerOff } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../config/api.config.js";

const Navbar = () => {
  const { user, isLogin, role, setUser, setIsLogin, setRole } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    //console.log("Handle Navigate", role);

    if (role === "restaurant") {
      navigate("/restaurant-dashboard");
    } else if (role === "rider") {
      navigate("/rider-dashboard");
    } else if (role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/customer-dashboard");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);

      sessionStorage.removeItem("cravingUser");
      setUser(null);
      setIsLogin(false);
      setRole(null);
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during registration. Please try again.",
      );
    }
  };

  return (
    <>
      <div className="sticky top-0 z-99 flex items-center justify-between px-12 py-1 bg-(--color-primary) text-white w-full h-16 shadow-md">
        <div className="h-full">
          <Link to="/">
            <img src={logoLight} alt="Logo" className="w-fit h-full" />{" "}
          </Link>
        </div>

        {isLogin ? (
          <div className="flex items-center gap-2">
            <button
              className="flex gap-2 items-center text-(--color-primary-content) border border-transparent hover:border-(--color-primary-content)  px-3 py-1 rounded"
              title="Go to Dashboard"
              onClick={handleNavigate}
            >
              <img
                src={user?.photo}
                alt={user?.fullName}
                className="w-12 h-12 rounded-full object-cover object-top"
              />
              <div className="flex flex-col items-start">
                <span className="text-base">{user?.fullName}</span>
                <span className="text-xs text-(--color-primary-content)/80">
                  Customer
                </span>
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="text-(--color-primary-content) border border-transparent hover:border-(--color-primary-content) hover:bg-(--color-error) px-3 py-3 rounded"
              title="Logout"
            >
              <FaPowerOff />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="text-(--color-primary-content) border border-transparent hover:border-(--color-primary-content) px-3 py-1 rounded"
            >
              Login
            </Link>
            <Link
              to="/register/customer"
              className="bg-(--color-primary-content) text-(--color-primary) hover:bg-(--color-primary) hover:text-(--color-primary-content) border px-3 py-1 rounded"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;