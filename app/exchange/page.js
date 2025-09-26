/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { FaShareAlt } from "react-icons/fa";
import TestimonialSlider from "../component/testimonial";
import { useRouter } from "next/navigation";
import { FaMoneyBillWave, FaUniversity, FaUserPlus } from "react-icons/fa";
import Cookies from "js-cookie";
import FeaturesSection from "../component/feature";
import Page from "../component/slide";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";
import { toast } from "react-hot-toast";
import "./exchange.css";
import { encryptData } from "../utils/crypo";
import Navbar from "../component/header";
import Footer from "../component/footer";
// import Slider from "react-slick";

export default function ExchangePage() {
  const [seconds, setSeconds] = useState(60);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showDepositModalPage, setShowDepositModalPage] = useState(false);
  const [network, setNetwork] = useState("TRC20"); // New network dropdown state
  const router = useRouter();
  const [passwordDigits, setPasswordDigits] = useState([]);
  const depositModalRef = useRef(null);
  const [redirecting, setRedirecting] = useState(false); // 👈 NEW
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check authentication token presence
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  // Timer countdown for rate refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handlers for modals
  const handleShowPasswordModal = () => setShowPasswordModal(true);
  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPassword("");
  };

  // Password submit validation & flow
  const handlePasswordSubmit = () => {
    if (password.length !== 6 || isNaN(Number(password))) {
      toast.error("Password must be exactly 6 digits.");
      return;
    }

    toast.success("Password saved!");
    handleClosePasswordModal();
    setShowDepositModalPage(true);
  };

  // Deposit amount submit and redirect to Deposit page
  const handleDepositRedirect = () => {
    if (!amountInput || isNaN(amountInput) || Number(amountInput) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    const newAmount = parseFloat(amountInput);

    const encryptedNewAmount = encryptData(newAmount.toString());
    Cookies.set("lastDepositAmount", encryptedNewAmount, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });

    Cookies.set("selectedNetwork", network, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });

    setShowDepositModalPage(false);
    toast.success(
      `$${newAmount.toFixed(
        2
      )} on ${network.toUpperCase()} saved! Redirecting to deposit page...`
    );
    setRedirecting(true);
    router.push("/deposite");
  };

  // Prevent closing modal when clicking outside deposit modal container
  const handleDepositModalOutsideClick = (e) => {
    if (
      depositModalRef.current &&
      !depositModalRef.current.contains(e.target)
    ) {
      // Prevent modal from closing on outside click
      // Uncomment below if you want to close on outside click:
      // setShowDepositModalPage(false);
    }
  };

  const handlesell = () => {
    toast.success("Please Add an Bank account to continue");
    router.push("/mine");
  };

  if (redirecting) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
        <div className="spinner-border text-light" role="status" />
        <span className="ms-3 fs-5">Redirecting...</span>
      </div>
    );
  }

  if (isAuthenticated === null) return null;

  // If not logged in → show login screen
  if (!isAuthenticated) {
    return (
      <div
        className="vh-100 d-flex flex-column align-items-center justify-content-center text-center"
        style={{
          background: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
          color: "white",
          padding: "2rem",
        }}
      >
        <div
          className="p-5 rounded-4 shadow-lg"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            maxWidth: "500px",
            width: "100%",
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              boxShadow: "0 0 20px rgba(37, 211, 102, 0.7)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="#25D366"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 1a4 4 0 0 0-4 4v3H3a1 1 0 0 
                0-1 1v6a1 1 0 0 0 1 1h10a1 
                1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1V5a4 
                4 0 0 0-4-4m3 7H5V5a3 3 0 1 1 
                6 0z"
              />
            </svg>
          </div>
          <h2 className="fw-bold mb-3">Access Restricted</h2>
          <p style={{ fontSize: "1.1rem", opacity: 0.85 }}>
            Please log in to unlock the Exchange and explore live crypto
            trading.
          </p>
          <Button
            variant="success"
            size="lg"
            href="/login"
            style={{
              borderRadius: "30px",
              padding: "10px 30px",
              marginTop: "1.2rem",
              boxShadow: "0 0 20px rgba(37, 211, 102, 0.6)",
            }}
          >
            🔑 Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const invite =()=>{
    Swal.fire({
    title: "Coming Soon",
    icon: "info", 
    confirmButtonText: "OK",
    background: "#7b2ff7",
    color: "#fff",
    confirmButtonColor: "#f107a3",
  });
  }
  

  return (
    <div style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}>
      <Page/>
      <Navbar />

<Container className="banner-container">
  {/* Left Side Text */}
  <div className="banner-left">
    <h1 className="banner-title">
      Your Exchange. <br /> Your Control.
    </h1>
    <p className="banner-subtitle">
      Premium USDT Xchange of India.
    </p>
    <Button
      size="lg"
      className="banner-deposit-btn"
      onClick={handleShowPasswordModal}
    >
      Deposit Now
    </Button>
  </div>

  {/* Right Side Image */}
  <div className="banner-right">
    <img
      src="/6240209949623964668.jpg"
      alt="Banner"
      className="banner-image"
    />
  </div>
</Container>

    
      {/* Exchange Info */}
<Container className="py-5 d-flex justify-content-center">
  <Card
    className="shadow-lg rounded-4 p-5 text-center"
    style={{
      maxWidth: "650px",
      background: "linear-gradient(135deg, #ffffff 0%, #f3f7ff 100%)",
      border: "1px solid #e2e8f0",
    }}
  >
    {/* Header */}
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h5 className="fw-bold text-primary m-0">💱 Current Exchange Rate</h5>
      <span className="text-muted small fw-semibold">
        ⏳ Auto-refresh in {seconds}s
      </span>
    </div>

    {/* Main Rate */}
    <h1 className="fw-bolder display-2 text-dark mb-2">
      99
      <Badge
        bg="warning"
        text="dark"
        className="ms-2 fs-5 px-3 py-2 rounded-pill shadow-sm"
      >
        BASE
      </Badge>
    </h1>
    <p className="text-secondary fs-5 mb-5">1 USDT = ₹99</p>

    {/* Tier Pricing */}
    <div className="table-responsive mb-4">
      <table className="table table-hover align-middle text-start mb-0">
        <thead className="table-light">
          <tr>
            <th scope="col" className="fw-semibold">Exchanges ($)</th>
            <th scope="col" className="fw-semibold">Prices (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="fw-medium">=1000 and &lt; 2000</td>
            <td className="text-danger fw-bold">₹99 + 0.50</td>
          </tr>
          <tr>
            <td className="fw-medium">&gt;=3000 and &lt; 5000</td>
            <td className="text-danger fw-bold">₹99 + 1</td>
          </tr>
          <tr>
            <td className="fw-medium">&gt;=10000</td>
            <td className="text-danger fw-bold">₹99 + 2</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Extra Info */}
    <a
      href="#"
      className="text-primary fw-semibold small text-decoration-none"
    >
      ℹ️ What is the tiered price policy?
    </a>
  </Card>
</Container>

<div className="d-flex justify-content-center mt-1 mb-4">
  <Button
    size="lg"
    style={{
      backgroundColor: "#031238ff",
      borderColor: "#0a0329ff",
      borderRadius: "30px",
      padding: "12px 36px",
      fontWeight: "600",
      color: "white",
      boxShadow: "0 6px 12px rgba(51, 2, 2, 0.6)",
      marginTop: "-35px", // 👈 lifts the button slightly upwards
    }}
    onClick={handlesell}
    onMouseOver={(e) =>
      (e.currentTarget.style.backgroundColor = "#097c2fff")
    }
    onMouseOut={(e) =>
      (e.currentTarget.style.backgroundColor = "#031238ff")
    }
  >
    Sell Now
  </Button>
</div>

<Container fluid className="px-0">
      <div
        style={{
          background: "#ffffff",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
          padding: "30px 0",
          position: "relative",
          zIndex: 10,
          width: "100%",
        }}
      >
        <Container className="d-flex justify-content-center">
          <div
            className="d-flex justify-content-center align-items-center flex-nowrap w-100"
            style={{
              maxWidth: "700px", // max width container
              gap: isMobile ? "10px" : "450px", // 🔥 big gap desktop, small gap mobile
              margin: "0 auto",
            }}
          >
            {/* Deposit */}
            <Button
              variant="light"
              className="d-flex flex-column align-items-center border-0 bg-transparent"
              style={{
                transition: "all 0.3s ease",
                transform: hovered === "deposit" ? "translateY(-3px)" : "none",
                minWidth: "80px",
              }}
              onMouseEnter={() => setHovered("deposit")}
              onMouseLeave={() => setHovered(null)}
              onClick={handleShowPasswordModal}
            >
              <FaMoneyBillWave
                size={36}
                className={`mb-2 ${
                  hovered === "deposit" ? "text-purple" : "text-dark"
                }`}
              />
              <span className="fw-semibold text-purple">Deposit</span>
            </Button>

            {/* Withdraw */}
            <Button
              variant="light"
              className="d-flex flex-column align-items-center border-0 bg-transparent"
              style={{
                transition: "all 0.3s ease",
                transform: hovered === "withdraw" ? "translateY(-3px)" : "none",
                minWidth: "80px",
              }}
              onMouseEnter={() => setHovered("withdraw")}
              onMouseLeave={() => setHovered(null)}
              onClick={handlesell}
            >
              <FaUniversity
                size={36}
                className={`mb-2 ${
                  hovered === "withdraw" ? "text-purple" : "text-dark"
                }`}
              />
              <span className="fw-semibold text-purple">Withdraw</span>
            </Button>

            {/* Invite */}
            <Button
              variant="light"
              className="d-flex flex-column align-items-center border-0 bg-transparent"
              style={{
                transition: "all 0.3s ease",
                transform: hovered === "invite" ? "translateY(-3px)" : "none",
                minWidth: "80px",
              }}
              onMouseEnter={() => setHovered("invite")}
              onMouseLeave={() => setHovered(null)}
              onClick={invite}
            >
              <FaUserPlus
                size={36}
                className={`mb-2 ${
                  hovered === "invite" ? "text-purple" : "text-dark"
                }`}
              />
              <span className="fw-semibold text-purple">Invite</span>
            </Button>
          </div>
        </Container>
      </div>
    </Container>

<FeaturesSection/>

<TestimonialSlider/>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/+919004501899"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          backgroundColor: "#25D366",
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={{ width: "32px", height: "32px" }}
        />
      </a>

      {/* Password Modal */}
      <Modal
        show={showPasswordModal}
        onHide={handleClosePasswordModal}
        centered
        backdrop="static"
        keyboard={false}
        dialogClassName="password-modal"
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title
            className="text-black fw-bold"
            style={{ fontSize: "1.8rem" }}
          >
            🔐 Enter Your 6-Digit Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            background: "rgba(10, 10, 20, 0.8)",
            borderRadius: "12px",
            boxShadow: "0 8px 3px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(37, 4, 93, 0.18)",
            color: "#fff",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              marginBottom: "1.5rem",
              animation: "pulse 2s infinite",
              fontSize: "3rem",
            }}
            aria-hidden="true"
          >
            🔒
          </div>
          <Form
            style={{
              width: "100%",
              maxWidth: "320px",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              handlePasswordSubmit();
            }}
          >
            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label
                className="fw-semibold"
                style={{
                  fontSize: "1.2rem",
                  letterSpacing: "1px",
                }}
              >
                Password
              </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={6}
                placeholder="Enter 6-digit password"
                autoFocus
                style={{
                  fontSize: "1.5rem",
                  textAlign: "center",
                  borderRadius: "30px",
                  border: "2px solid #6e57f7",
                  backgroundColor: "rgba(30, 30, 60, 0.8)",
                  color: "#fff",
                  boxShadow: "0 0 10px #6e57f7",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#a08fff")}
                onBlur={(e) => (e.target.style.borderColor = "#6e57f7")}
                pattern="\d{6}"
                title="Please enter exactly 6 digits"
                inputMode="numeric"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 fw-bold"
              style={{
                backgroundColor: "#6e57f7",
                borderRadius: "30px",
                padding: "12px 0",
                fontSize: "1.25rem",
                boxShadow: "0 8px 15px rgba(110, 87, 247, 0.5)",
                transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                border: "none",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#a08fff";
                e.currentTarget.style.boxShadow =
                  "0 15px 25px rgba(160, 143, 255, 0.6)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#6e57f7";
                e.currentTarget.style.boxShadow =
                  "0 8px 15px rgba(110, 87, 247, 0.5)";
              }}
            >
              Unlock
            </Button>
          </Form>
        </Modal.Body>

        <style jsx>{`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.7;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .password-modal .modal-content {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }
          .password-modal .btn-close {
            filter: invert(1);
            opacity: 0.75;
            transition: opacity 0.3s ease;
          }
          .password-modal .btn-close:hover {
            opacity: 1;
          }
        `}</style>
      </Modal>

      {/* BIGGER FULL PAGE DEPOSIT MODAL */}
      {showDepositModalPage && (
        <div
          onClick={handleDepositModalOutsideClick}
          style={{
            position: "fixed",
            inset: 0,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backdropFilter: "blur(6px)",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <div
            ref={depositModalRef}
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "40px",
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            <h4 className="mb-4 text-primary fw-bold text-center">
              Enter Deposit Amount & Network
            </h4>
            <Form>
              <Form.Group controlId="networkSelect" className="mb-3">
                <Form.Label>Select Network</Form.Label>
                <Form.Select
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                >
                  <option value="TRC20">TRC20</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="amountInput" className="mb-4">
                <Form.Label>Amount (USDT)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Enter amount"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleDepositRedirect}
                >
                  Continue to Deposit
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setShowDepositModalPage(false)}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
