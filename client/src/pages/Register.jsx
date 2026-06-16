import React, { useState } from "react";
import deliveryboy from "../assets/deliberyboy.png";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      name: registerData.name,
      email: registerData.email.toLowerCase(),
      password: registerData.password,
    };

    console.log("Register Data:", payload);
  };

  return (
    <div className="h-[90vh] bg-linear-to-r from-(--secondary) to-(--primary) grid md:grid-cols-2 p-10">
      <div className="hidden md:block">
        <img src={deliveryboy} alt="" className="rotate-y-180" />
      </div>

      <div className="w-md bg-(--background) rounded shadow p-10 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-6">Create Account</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={registerData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 bg-(--primary) text-white py-2 px-4 rounded hover:bg-(--accent)"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;