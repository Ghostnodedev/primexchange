'use client';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../component/header";
import Link from "next/link";


export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [token , settoken] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Data:", formData);
    alert("Message Sent!");
    setFormData({ name: "", email: "", message: "" });
  };


  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    settoken(storedToken);
  }, []);

  return (
    <>
      {token ? (
        <div className="vh-100 d-flex align-items-center justify-content-center" 
         style={{ 
           background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)" 
         }}>
            <Navbar />
      <form 
        onSubmit={handleSubmit} 
        className="p-5 rounded-4 shadow-lg text-white w-100" 
        style={{ maxWidth: "500px", backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <div className="form-floating mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control text-white"
            id="floatingName"
            placeholder="Your Name"
            required
            style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)" }}
          />
          <label htmlFor="floatingName" className="text-white">Your Name</label>
        </div>

        <div className="form-floating mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control text-white"
            id="floatingEmail"
            placeholder="Your Email"
            required
            style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)" }}
          />
          <label htmlFor="floatingEmail" className="text-white">Your Email</label>
        </div>

        <div className="form-floating mb-4">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-control text-white"
            id="floatingMessage"
            placeholder="Your Message"
            required
            style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", height: "150px" }}
          ></textarea>
          <label htmlFor="floatingMessage" className="text-white">Your Message</label>
        </div>

        <button 
          type="submit"
          className="btn btn-primary w-100"
        >
          Send Message
        </button>
      </form>
    </div>
      ) : (
        <>
          <h1>You need to be logged in to view this content.</h1>
          <p>Please log in here <Link href="/login">Login</Link></p>
        </>
      )}
    </>
  );
}

