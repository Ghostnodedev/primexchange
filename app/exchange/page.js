
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useRef } from "react";
import TestimonialSlider from "../component/testimonial";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import FeaturesSection from "../component/feature";
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
    localStorage.setItem("securePassword", password);
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

  // Example rates and testimonials data
  let prices = [
    { usd: 2999, inr: 95.5 },
    { usd: 4999, inr: 96.5 },
    { usd: 9999, inr: 97.5 },
  ];


  return (
    <div style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}>
      <Navbar />

      {/* Banner */}
      <div
        className="banner-section d-flex align-items-center text-center text-white"
        style={{
          position: "relative",
          minHeight: "550px",
          padding: "80px 20px",
          overflow: "hidden",
          backgroundImage:
            "linear-gradient(rgba(0 , 0 ,0, 0.5)), url('https://images.pexels.com/photos/11279903/pexels-photo-11279903.jpeg?auto=compress&cs=tinysrgb&w=600",
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "inset 0 0 60px rgba(1,1,1,0.5)",

          // borderRadius: "12px",
        }}
      >
        {/* Shiny gloss effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-150%",
            width: "50%",
            height: "100%",
            background:
              "linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent)",
            transform: "skewX(-25deg)",
            animation: "shine 10s infinite",
            pointerEvents: "none",
            zIndex: 1,
            borderRadius: "12px",
          }}
        ></div>

        <Container style={{ position: "relative", zIndex: 2 }}>
<div className="hero">
  <h1 className="typingEffect desktopOnly">Your Exchange. Your Control.</h1>
  
  {/* Mobile: two lines */}
  <h1 className="typingEffect mobileOnly">Your Exchange.</h1>
  <h1 className="typingEffect mobileOnly">Your Control.</h1>

  <p className="subTextFade">
    Premium USDT Xchange of India.
  </p>
</div>


          <p
            className="lead mt-3 mb-5"
            style={{
              textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
              fontSize: "1.35rem",
            }}
          >
            Secure, Fast, and Transparent — Trusted by thousands.
          </p>
          <Button
            size="lg"
            style={{
              background:
                "linear-gradient(130deg, #3b17d7ff 0%, #07285eff 100%)",
              border: "none",
              borderRadius: "30px",
              padding: "14px 42px",
              fontWeight: "700",
              color: "#fff",
              boxShadow: "5px 5px 8px 2px rgba(0, 0, 0, 0.4)",
              transition: "all 0.3s ease",
              letterSpacing: "0.5px",
              fontSize: "1.1rem",
            }}
            onClick={handleShowPasswordModal}
            onMouseOver={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #9eaac5ff 0%, #031955ff 100%)";
              e.currentTarget.style.boxShadow =
                "0 12px 28px rgba(59, 130, 246, 0.5)";
            }}
            // onMouseOut={(e) => {
            //   e.currentTarget.style.background =
            //     "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)";
            //   e.currentTarget.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.4)";
            // }}
          >
             Deposit Now
          </Button>
        </Container>

        <style jsx>{`
          @keyframes shine {
            0% {
              left: -150%;
            }
            50% {
              left: 150%;
            }
            100% {
              left: -150%;
            }
          }
        `}</style>
      </div>

      {/* Exchange Info */}
      <Container className="py-5">
        <Container className="py-5">
          <Card className="shadow-lg mb-5 px-4 py-5 rounded-4">
            <Row className="align-items-center">
              {/* Left Section */}
              <Col md={6}>
                <h2 className="fw-bold fs-2 text-primary">
                  Current Exchange Rate
                </h2>
                <p className="text-muted">Auto-refresh in {seconds}s</p>
              </Col>

              {/* Sell Button */}
              <Col
                md={3}
                className="text-center mt-4 mt-md-0"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  size="lg"
                  style={{
                    backgroundColor: "#EF4444",
                    borderColor: "#7b0404ff",
                    borderRadius: "30px",
                    padding: "12px 36px",
                    fontWeight: "600",
                    color: "white",
                    boxShadow: "0 6px 12px rgba(51, 2, 2, 0.6)",
                    marginLeft: "20px", // 👈 pushes right only a bit
                  }}
                  onClick={handlesell}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#B91C1C")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#EF4444")
                  }
                >
                  Sell Now
                </Button>
              </Col>

              {/* Price & Badge */}
              <Col md={3} className="text-center text-md-end mt-4 mt-md-0">
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: "#1e2a78",
                  }}
                >
                  ₹95 {/* Desktop view: inline badge */}
                  <span className="d-none d-md-inline">
                    <Badge
                      bg="warning"
                      text="dark"
                      style={{
                        fontSize: "1.2rem", // bigger on desktop
                        padding: "8px 20px",
                      }}
                    >
                      BASE
                    </Badge>
                  </span>
                </div>

                {/* Mobile view: badge beneath */}
                <div className="d-block d-md-none mt-2">
                  <Badge
                    bg="warning"
                    text="dark"
                    style={{
                      fontSize: "1.3rem", // bigger on mobile too
                      padding: "10px 24px",
                    }}
                  >
                    BASE
                  </Badge>
                </div>
                <small className="text-muted d-block mt-1">1 USDT = ₹95</small>
              </Col>
            </Row>
          </Card>
        </Container>


        <div className="card-section">
          {prices.map((item, idx) => (
            <div key={idx} className="card">
              <h3>${item.usd}</h3>
              <p>₹{item.inr}</p>
            </div>
          ))}

        <FeaturesSection />

          <style jsx>{`
            .card-section {
              margin-top: -50px;
              display: flex;
              gap: 20px;
              justify-content: center;
              align-items: stretch;
              flex-wrap: wrap;
            }

            .card {
              flex: 1 1 250px;
              height: 120px;
              max-width: 400px;
              background: #fff;
              border: 3px solid transparent;
              border-radius: 30px;
              padding: 30px;
              text-align: center;
              box-shadow: 1px 1px 6px 5px rgba(2, 11, 27, 0.1);
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            .card:hover {
              transform: translateY(-6px);
              box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
            }

            .card h3 {
              margin: 0;
              font-size: 1.4rem;
              font-weight: 700;
              color: #111827;
            }

            .card p {
              margin-top: 8px;
              font-size: 1rem;
              color: #8b5cf6;
              font-weight: 500;
            }

            /* Responsive */
            @media (max-width: 768px) {
              .card-section {
                flex-direction: column;
                align-items: center;
              }
              .card {
                width: 80%;
                max-width: 250px;
                max-height: 120px;
              }
            }
          `}</style>
        </div>


        <TestimonialSlider />
      </Container>

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
