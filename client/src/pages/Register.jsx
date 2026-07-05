// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import deliveryboy from "../assets/deliberyboy.png";
// import api from "../config/api.config.js";

// const Register = () => {
//   const navigate = useNavigate();
//   const [registerData, setRegisterData] = useState({
//     fullName: "",
//     email: "",
//     gender: "",
//     dob: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [validateError, setValidateError] = useState();

//   const handleChange = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;

//     setRegisterData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (registerData.password !== registerData.confirmPassword) {
//       setValidateError("Passwords do not match");
//       return;
//     }

//     setValidateError("");
//     console.log("Register data submitted:", registerData);

//     const payload = {
//       fullName: registerData.fullName,
//       email: registerData.email.toLowerCase(),
//       gender: registerData.gender,
//       dob: registerData.dob,
//       phone: registerData.phone,
//       password: registerData.password,
//     };

//     try {
//       const res = await api.post("/auth/register", payload);
//       alert(res.data.message);
//     } catch (error) {
//    console.log(error.response?.data?.message || error.message);
//     }
    
//   };

//   const inputClass =
//     "border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)";

//   return (
//     <>
//       <div className="min-h-[90vh] bg-linear-to-r from-(--secondary) to-(--primary) grid grid-cols-2 p-10">
//         <div className="hidden md:block">
//           <img src={deliveryboy} alt="" className="rotate-y-180" />
//         </div>
//         <div className="w-2xl bg-(--background) rounded shadow p-10 flex flex-col justify-center">
//           <div className="text-xl font-semibold mb-4">Create an Account</div>

//           <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//             {/* Full Name */}
//             <div className="col-span-2 flex flex-col gap-2">
//               <label htmlFor="fullName">Full Name</label>
//               <input
//                 type="text"
//                 id="fullName"
//                 name="fullName"
//                 value={registerData.fullName}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             {/* Email */}
//             <div className="flex flex-col gap-2">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={registerData.email}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//             {/* Phone */}
//             <div className="flex flex-col gap-2">
//               <label htmlFor="phone">Phone</label>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 value={registerData.phone}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             {/* Gender */}
//             <div className="flex flex-col gap-2">
//               <label htmlFor="gender">Gender</label>
//               <select
//                 id="gender"
//                 name="gender"
//                 value={registerData.gender}
//                 onChange={handleChange}
//                 className={inputClass}
//               >
//                 <option value="">Select gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             {/* Date of Birth */}
//             <div className="flex flex-col gap-2">
//               <label htmlFor="dob">Date of Birth</label>
//               <input
//                 type="date"
//                 id="dob"
//                 name="dob"
//                 value={registerData.dob}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             {/* Password */}
//             <div className="flex flex-col gap-2">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={registerData.password}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             {/* Confirm Password */}
//             <div className="flex flex-col gap-2">
//               <label htmlFor="confirmPassword">Confirm Password</label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 value={registerData.confirmPassword}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             {validateError && (
//               <p className="text-red-500 text-sm col-span-2">{validateError}</p>
//             )}

//             <button
//               type="submit"
//               className="col-span-2 mt-2 bg-(--primary) text-white py-2 px-4 rounded hover:bg-(--accent)"
//             >
//               Register
//             </button>
//           </form>

//           <div className="mt-6 text-center space-y-2">
//             <p className="text-sm">
//               Already have an account?{" "}
//               <button
//                 onClick={() => navigate("/login")}
//                 className="text-(--primary) hover:underline font-semibold"
//               >
//                 Login here
//               </button>
//             </p>
//             <p className="text-sm">
//               Having Trouble?{" "}
//               <button
//                 onClick={() => navigate("/contact")}
//                 className="text-(--primary) hover:underline font-semibold"
//               >
//                 Contact Us
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../config/api.config.js";

const Register = () => {
  const userType = useParams().userType; // Get userType from URL params (if needed)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: userType || "customer",
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUserTypeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      userType: e.target.value,
    }));
  };

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    if (!data.phone.trim()) newErrors.phone = "Phone number is required";
    if (!data.gender) newErrors.gender = "Gender is required";
    if (!data.dob) newErrors.dob = "Date of birth is required";
    if (!data.password || data.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!data.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    if (data.password !== data.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!data.agreeTerms)
      newErrors.agreeTerms = "You must agree to terms and conditions";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    console.log("Form submitted:", formData);

    try {
      const res = await api.post("/auth/register", {
        ...formData,
        email: formData.email.toLowerCase(),
      });
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during registration. Please try again.",
      );
    } finally {
      setLoading(false);
    }
    // Handle registration here
  };

  return (
    <div className="h-[90vh] bg-[url('/foodTable.webp')] flex items-center justify-end bg-cover bg-center p-10 md:pe-30">
      <div className="bg-white rounded-lg shadow-md px-10 py-6 max-w-md w-full overflow-y-auto max-h-[85vh]">
        <h1 className="text-3xl font-bold text-(--color-primary) mb-2 text-center">
          Create Account
        </h1>
        <p className="text-(--color-secondary) text-center mb-4">
          Join us as a Customer, Restaurant, or Rider
        </p>

        {/* User Type Selection */}
        <div className="mb-6">
          <label className="block text-(--color-neutral) font-semibold mb-3">
            Register as:
          </label>
          <div className="flex gap-5">
            {["customer", "restaurant", "rider"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="userType"
                  value={type}
                  checked={formData.userType === type}
                  onChange={handleUserTypeChange}
                  className="cursor-pointer"
                />
                <span className="text-(--color-neutral) capitalize">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={`w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                errors.fullName
                  ? "border-(--color-error) border-2"
                  : "border-(--color-base-300)"
              }`}
            />
            {errors.fullName && (
              <span className="text-(--color-error) text-xs mt-1 block">
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                errors.email
                  ? "border-(--color-error) border-2"
                  : "border-(--color-base-300)"
              }`}
            />
            {errors.email && (
              <span className="text-(--color-error) text-xs mt-1 block">
                {errors.email}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
           
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className={`w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                errors.phone
                  ? "border-(--color-error) border-2"
                  : "border-(--color-base-300)"
              }`}
            />
            {errors.phone && (
              <span className="text-(--color-error) text-xs mt-1 block">
                {errors.phone}
              </span>
            )}
          </div>

          {/* Gender & Date of Birth */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                  errors.gender
                    ? "border-(--color-error) border-2"
                    : "border-(--color-base-300)"
                }`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <span className="text-(--color-error) text-xs mt-1 block">
                  {errors.gender}
                </span>
              )}
            </div>
            <div>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                  errors.dob
                    ? "border-(--color-error) border-2"
                    : "border-(--color-base-300)"
                }`}
              />
              {errors.dob && (
                <span className="text-(--color-error) text-xs mt-1 block">
                  {errors.dob}
                </span>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
          
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={`w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                errors.password
                  ? "border-(--color-error) border-2"
                  : "border-(--color-base-300)"
              }`}
            />
            {errors.password && (
              <span className="text-(--color-error) text-xs mt-1 block">
                {errors.password}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <input
              type="text"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className={`w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                errors.confirmPassword
                  ? "border-(--color-error) border-2"
                  : "border-(--color-base-300)"
              }`}
            />
            {errors.confirmPassword && (
              <span className="text-(--color-error) text-xs mt-1 block">
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label className="flex items-start gap-2 cursor-pointer text-(--color-secondary)">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="mt-1 cursor-pointer"
              />
              <span className="text-sm">
                I agree to the{" "}
                <span className="text-(--color-primary) hover:underline">
                  terms and conditions.
                </span>
              </span>
            </label>
            {errors.agreeTerms && (
              <span className="text-(--color-error) text-xs mt-1 block ml-7">
                {errors.agreeTerms}
              </span>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-(--color-primary) text-white font-semibold rounded-md hover:bg-orange-700 transition-colors duration-300 mb-4"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-(--color-secondary) text-sm">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-(--color-primary) font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;