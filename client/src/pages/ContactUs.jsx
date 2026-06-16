import React, { useState } from "react";

const ContactUs = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Form:", contactData);

    setContactData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    alert("Message sent successfully!");
  };

  return (
    <div className="min-h-[90vh] bg-linear-to-r from-(--secondary) to-(--primary) flex justify-center items-center p-6">
      <div className="bg-(--background) w-full max-w-2xl rounded shadow-lg p-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={contactData.name}
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
              value={contactData.email}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={contactData.subject}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label>Message</label>
            <textarea
              name="message"
              rows="5"
              value={contactData.message}
              onChange={handleChange}
              className="border p-2 rounded resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 bg-(--primary) text-white py-2 px-4 rounded hover:bg-(--accent)"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;