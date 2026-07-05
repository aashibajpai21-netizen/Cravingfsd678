// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import deliveryboy from "../assets/deliberyboy.png";

// const ContactUs = () => {
//   const navigate = useNavigate();
//   const [contactData, setContactData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });

//   const [validateError, setValidateError] = useState();
//   const [successMessage, setSuccessMessage] = useState();

//   const handleChange = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;

//     setContactData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !contactData.fullName ||
//       !contactData.email ||
//       !contactData.phone ||
//       !contactData.subject ||
//       !contactData.message
//     ) {
//       setValidateError("All fields are required");
//       return;
//     }

//     setValidateError("");
//     setSuccessMessage(
//       "Thank you for contacting us! We'll get back to you soon.",
//     );
//     console.log("Contact data submitted:", contactData);

//     const payload = {
//       fullName: contactData.fullName,
//       email: contactData.email.toLowerCase(),
//       phone: contactData.phone,
//       subject: contactData.subject,
//       message: contactData.message,
//     };

//     // Reset form after submission
//     setTimeout(() => {
//       setContactData({
//         fullName: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//       });
//       setSuccessMessage("");
//     }, 3000);
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
//           <div className="text-xl font-semibold mb-4">Contact Us</div>

//           <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//             {/* Full Name */}
//             <div className="flex flex-col gap-2">
//               <label htmlFor="fullName">Full Name</label>
//               <input
//                 type="text"
//                 id="fullName"
//                 name="fullName"
//                 value={contactData.fullName}
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
//                 value={contactData.email}
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
//                 value={contactData.phone}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             {/* Subject */}
//             <div className="flex flex-col gap-2">
//               <label htmlFor="subject">Subject</label>
//               <input
//                 type="text"
//                 id="subject"
//                 name="subject"
//                 value={contactData.subject}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             {/* Message */}
//             <div className="col-span-2 flex flex-col gap-2">
//               <label htmlFor="message">Message</label>
//               <textarea
//                 id="message"
//                 name="message"
//                 value={contactData.message}
//                 onChange={handleChange}
//                 rows="5"
//                 className={inputClass}
//               />
//             </div>

//             {validateError && (
//               <p className="text-red-500 text-sm col-span-2">{validateError}</p>
//             )}

//             {successMessage && (
//               <p className="text-green-500 text-sm col-span-2">
//                 {successMessage}
//               </p>
//             )}

//             <button
//               type="submit"
//               className="col-span-2 mt-2 bg-(--primary) text-white py-2 px-4 rounded hover:bg-(--accent)"
//             >
//               Send Message
//             </button>
//           </form>

//           <div className="mt-6 text-center space-y-2">
//             <p className="text-sm">
//               Want to order Delicious Food?{" "}
//               <button
//                 onClick={() => navigate("/login")}
//                 className="text-(--primary) hover:underline font-semibold"
//               >
//                 Login
//               </button>
//               {" | "}
//               <button
//                 onClick={() => navigate("/register")}
//                 className="text-(--primary) hover:underline font-semibold"
//               >
//                 Register
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ContactUs;

import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import api from "../config/api.config.js";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    if (!data.subject.trim()) newErrors.subject = "Subject is required";
    if (!data.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/public/contact-us", {
        ...formData,
        email: formData.email.toLowerCase(),
      });
      toast.success(res.data.message);
      setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
      setErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
      errors[field]
        ? "border-(--color-error) border-2"
        : "border-(--color-base-300)"
    }`;

  return (
    <div
      className="h-[90vh] flex items-center justify-start bg-[url('/contactPage.jpg')] bg-cover bg-center p-10 md:ps-30"
    >
      <div className="bg-white rounded-lg shadow-md px-10 py-6 max-w-md w-full overflow-y-auto max-h-[85vh]">
        <h1 className="text-3xl font-bold text-(--color-primary) mb-2 text-center">
          Contact Us
        </h1>
        <p className="text-(--color-secondary) text-center mb-5">
          Have a question? We'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={inputClass("fullName")}
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
              className={inputClass("email")}
            />
            {errors.email && (
              <span className="text-(--color-error) text-xs mt-1 block">
                {errors.email}
              </span>
            )}
          </div>

          {/* Phone (optional) */}
          <div className="mb-4">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className={inputClass("phone")}
            />
          </div>

          {/* Subject */}
          <div className="mb-4">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="What is this about?"
              className={inputClass("subject")}
            />
            {errors.subject && (
              <span className="text-(--color-error) text-xs mt-1 block">
                {errors.subject}
              </span>
            )}
          </div>

          {/* Message */}
          <div className="mb-6">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Write your message here..."
              rows={4}
              className={inputClass("message") + " resize-none"}
            />
            {errors.message && (
              <span className="text-(--color-error) text-xs mt-1 block">
                {errors.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-(--color-primary) text-white font-semibold rounded-md hover:bg-orange-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;