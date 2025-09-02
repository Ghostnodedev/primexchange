/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
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
import { encryptData } from "../utils/crypo";
import Navbar from "../component/header";
import Footer from "../component/footer";
import Slider from "react-slick";

export default function ExchangePage() {
  const [seconds, setSeconds] = useState(60);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showDepositModalPage, setShowDepositModalPage] = useState(false);
  const [network, setNetwork] = useState("erc20"); // New network dropdown state
  const router = useRouter();
  const depositModalRef = useRef(null);

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
    if (password.length !== 10 || isNaN(Number(password))) {
      toast.error("Password must be exactly 10 digits.");
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
      `$${newAmount.toFixed(2)} on ${network.toUpperCase()} saved! Redirecting to deposit page...`
    );

    router.push("/deposite");
  };

  // Prevent closing modal when clicking outside deposit modal container
  const handleDepositModalOutsideClick = (e) => {
    if (depositModalRef.current && !depositModalRef.current.contains(e.target)) {
      // Prevent modal from closing on outside click
      // Uncomment below if you want to close on outside click:
      // setShowDepositModalPage(false);
    }
  };

  const handlesell = () => {
    toast.success("Please Add an Bank account to continue");
    router.push("/mine");
  };

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
              <path d="M8 1a4 4 0 0 0-4 4v3H3a1 1 0 0 
                0-1 1v6a1 1 0 0 0 1 1h10a1 
                1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1V5a4 
                4 0 0 0-4-4m3 7H5V5a3 3 0 1 1 
                6 0z" />
            </svg>
          </div>
          <h2 className="fw-bold mb-3">Access Restricted</h2>
          <p style={{ fontSize: "1.1rem", opacity: 0.85 }}>
            Please log in to unlock the Exchange and explore live crypto trading.
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
  const rates = [
    { usd: 2999, inr: 95.5 },
    { usd: 4999, inr: 96.5 },
    { usd: 9999, inr: 97.5 },
  ];

  const testimonials = [
    {
      name: "Aman Sharma",
      role: "Crypto Trader",
      img: "/users/user1.jpg",
      rating: 5,
      text: "Fast, reliable, and hassle-free service. I got my INR within minutes of sending USDT.",
    },
    {
      name: "zoya Patel",
      role: "Financial Advisor",
      img: "/users/user2.jpg",
      rating: 4,
      text: "Honestly impressed with the speed and transparency.",
    },
    {
      name: "kane smith",
      role: "Trader",
      img: "/users/user2.jpg",
      rating: 4,
      text: "Honestly impressed with the speed and transparency.",
    },    
    {
      name: "ranveer singhnya",
      role: "Financial Advisor",
      img: "/users/user2.jpg",
      rating: 4,
      text: "Honestly impressed with the speed and transparency.",
    },
    {
      name: "anjali singh",
      role: "Financial Advisor",
      img: "/users/user2.jpg",
      rating: 4,
      text: "Honestly impressed with the speed and transparency.",
    },
  ];

  // React Slick slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,      // default for desktop
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 992,   // tablets and small desktops
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,   // mobile devices
      settings: {
        slidesToShow: 1,
        centerMode: true,    // optional: center the single slide for better look
        centerPadding: '20px',
      },
    },
  ],
};


  return (
    <div style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}>
      <Navbar />

      {/* Banner */}
      <div
        className="banner-section d-flex align-items-center text-center text-white"
        style={{
          background: "linear-gradient(150deg, #4f46e5, #3b82f6)",
          minHeight: "350px",
          padding: "60px 20px",
        }}
      >
        <Container>
          <h1 className="fw-bold display-4">
            Buy & Sell USDT at the Best Rates
          </h1>
          <p className="lead mt-3">
            Secure, Fast, and Transparent — Trusted by thousands.
          </p>
          <Button variant="warning" size="lg" onClick={handleShowPasswordModal}>
            Deposit Now
          </Button>
        </Container>
      </div>

      {/* Exchange Info */}
      <Container className="py-5">
        <Card className="shadow-lg mb-5 px-4 py-5 rounded-4">
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold fs-2 text-primary">
                Current Exchange Rate
              </h2>
              <p className="text-muted">Auto-refresh in {seconds}s</p>
            </Col>
            <Col md={3} className="text-center mt-4 mt-md-0">
              <Button variant="danger" size="lg" onClick={handlesell}>
                Sell Now
              </Button>
            </Col>
            <Col md={3} className="text-end mt-4 mt-md-0">
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#1e2a78",
                }}
              >
                ₹95 <Badge bg="warning" text="dark">BASE</Badge>
              </div>
              <small className="text-muted">1 USDT = ₹95</small>
            </Col>
          </Row>
        </Card>

        {/* Rates */}
        <Row className="g-4">
          {rates.map((rate, idx) => (
            <Col key={idx} xs={12} md={4}>
              <Card className="text-center shadow-sm rounded-3 py-4">
                <h5 className="fw-bold">${rate.usd}</h5>
                <p className="text-primary fs-5">₹{rate.inr}</p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Testimonials */}
<Container className="mt-5">
  <h3 className="fw-bold mb-5 text-center text-dark">Testimonials</h3>
  <Slider {...settings}>
    {testimonials.map((item, idx) => (
      <div key={idx} className="px-3">
        <Card
          className="shadow-lg border-0 rounded-5 p-5 h-100"
          style={{
            minHeight: "350px",       // Taller cards
            transition: "transform 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(140, 39, 224, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "rgba(0, 0, 0, 0.1) 0px 4px 6px";
          }}
        >
          <div className="mb-3">
            {[...Array(item.rating)].map((_, i) => (
              <span
                key={i}
                style={{
                  color: "#fbbf24",
                  fontSize: "1.6rem",  // Bigger stars
                  marginRight: "2px",
                  filter: "drop-shadow(0 0 2px #fbbf24)",
                }}
              >
                ★
              </span>
            ))}
          </div>
          <p
            className="text-muted"
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.6",
              minHeight: "120px",
              marginBottom: "2.5rem",
              fontStyle: "italic",
              color: "#555",
            }}
          >
            {item.text}
          </p>
          <div className="d-flex align-items-center mt-auto">
            <img
              src={item.img}
              alt={item.name}
              className="rounded-circle me-3"
              style={{
                width: "65px",
                height: "65px",
                border: "3px solid #8c27e0",
                boxShadow: "0 0 10px rgba(140, 39, 224, 0.6)",
              }}
            />
            <div>
              <h6 className="mb-0 fw-bold" style={{ color: "#241654" }}>
                {item.name}
              </h6>
              <small className="text-muted">{item.role}</small>
            </div>
          </div>
        </Card>
      </div>
    ))}
  </Slider>
</Container>
      </Container>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/1234567890"
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
      <Modal show={showPasswordModal} onHide={handleClosePasswordModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            Enter Password to Continue
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPassword">
              <Form.Label className="fw-semibold">
                10-digit Secure Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter 10-digit password"
                value={password}
                maxLength={10}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text muted>
                Keep this safe! You will need it again.
              </Form.Text>
            </Form.Group>
            <div className="d-grid gap-2 mt-4">
              <Button variant="primary" size="lg" onClick={handlePasswordSubmit}>
                Submit & Continue
              </Button>
            </div>
          </Form>
        </Modal.Body>
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
                  <option value="erc20">ERC20</option>
                  <option value="bep20">BEP20</option>
                  <option value="trc20">TRC20</option>
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
                <Button variant="success" size="lg" onClick={handleDepositRedirect}>
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
      <Footer/>
    </div>
  );
}
