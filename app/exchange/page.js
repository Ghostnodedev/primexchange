/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Button, Badge, Modal, Form } from 'react-bootstrap';
import Navbar from '../component/header';
import Slider from 'react-slick';
import { toast } from 'react-hot-toast';
import { FaRegCopy } from 'react-icons/fa';

export default function ExchangePage() {
  const [seconds, setSeconds] = useState(60);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const router = useRouter();

  // Check auth token
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Auto-refresh countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const rates = [
    { usd: 2999, inr: 95.5 },
    { usd: 4999, inr: 96.5 },
    { usd: 9999, inr: 97.5 },
  ];

  const testimonials = [
    {
      name: 'Aman Sharma',
      role: 'Crypto Trader',
      img: '/users/user1.jpg',
      rating: 5,
      text: 'Fast, reliable, and hassle-free service. I got my INR within minutes of sending USDT.',
    },
    {
      name: 'Seema Patel',
      role: 'Financial Advisor',
      img: '/users/user2.jpg',
      rating: 4,
      text: 'Honestly impressed with the speed and transparency. USDT to INR has never been this easy for me.',
    },
    {
      name: 'Kane Smith',
      role: 'Financial Advisor',
      img: '/users/user2.jpg',
      rating: 4,
      text: 'Honestly impressed with the speed and transparency. USDT to INR has never been this easy for me.',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPassword('');
  };

  const handlePasswordSubmit = () => {
    if (password.length !== 10 || isNaN(Number(password))) {
      toast.error('Password must be exactly 10 digits.');
      return;
    }

    localStorage.setItem('securePassword', password);
    toast.success('Password saved successfully!');
    handleCloseModal();

    // Show the transaction modal after closing the password modal
    generateTransactionId();
    setShowTransactionModal(true);
  };

  const generateTransactionId = () => {
    const id = Math.floor(Math.random() * 1e16).toString(36).slice(0, 10).toUpperCase();
    setTransactionId(id);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transactionId).then(() => {
      toast.success('Transaction ID copied to clipboard!');
    });
  };

  if (isAuthenticated === null) return null;

  if (!isAuthenticated) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <h3>Please login to continue</h3>
          <Button variant="primary" href="/login">Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fc', minHeight: '100vh' }}>
      <Navbar />

      {/* === Banner === */}
      <div
        className="banner-section d-flex align-items-center text-center text-white"
        style={{
          background: 'linear-gradient(150deg, #4f46e5, #3b82f6)',
          minHeight: '350px',
          padding: '60px 20px',
        }}
      >
        <Container>
          <h1 className="fw-bold display-4">Buy & Sell USDT at the Best Rates</h1>
          <p className="lead mt-3">Secure, Fast, and Transparent — Trusted by thousands.</p>
        </Container>
      </div>

      {/* === Exchange Box === */}
      <Container className="py-5">
        <Card className="shadow-lg mb-5 px-4 py-5 rounded-4">
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold fs-2 text-primary">Current Exchange Rate</h2>
              <p className="text-muted">Auto-refresh in {seconds}s</p>
            </Col>
            <Col md={3} className="text-center mt-4 mt-md-0">
              <Button variant="danger" size="lg" onClick={handleShowModal}>
                Sell Now
              </Button>
            </Col>
            <Col md={3} className="text-end mt-4 mt-md-0">
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e2a78' }}>
                ₹95 <Badge bg="warning" text="dark">BASE</Badge>
              </div>
              <small className="text-muted">1 USDT = ₹95</small>
            </Col>
          </Row>
        </Card>

        {/* === Rate Cards === */}
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

        {/* === Testimonials === */}
        <Container className="mt-5">
          <h3 className="fw-bold mb-4 text-center text-dark">Testimonials</h3>
          <Slider {...settings}>
            {testimonials.map((item, idx) => (
              <div key={idx} className="px-3">
                <Card className="shadow-sm border-0 rounded-4 p-4 h-100">
                  <div className="mb-3">
                    {[...Array(item.rating)].map((_, i) => (
                      <span key={i} style={{ color: '#fbbf24', fontSize: '1.2rem' }}>★</span>
                    ))}
                  </div>
                  <p className="text-muted">{item.text}</p>
                  <div className="d-flex align-items-center mt-4">
                    <img src={item.img} alt={item.name} className="rounded-circle me-3" style={{ width: '50px', height: '50px' }} />
                    <div>
                      <h6 className="mb-0 fw-bold">{item.name}</h6>
                      <small className="text-muted">{item.role}</small>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </Slider>
        </Container>
      </Container>

      {/* === WhatsApp Icon === */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          backgroundColor: '#25D366',
          width: '55px',
          height: '55px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        <img src="/whatsapp-icon.png" alt="WhatsApp" style={{ width: '30px' }} />
      </a>

      {/* === Password Modal === */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Enter Password to Continue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPassword">
              <Form.Label className="fw-semibold">10-digit Secure Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter 10-digit password"
                value={password}
                maxLength={10}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text muted>Keep this safe! You will need it again.</Form.Text>
            </Form.Group>
            <div className="d-grid gap-2 mt-4">
              <Button variant="primary" size="lg" onClick={handlePasswordSubmit}>
                Submit & Continue
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* === Transaction ID Modal === */}
      <Modal show={showTransactionModal} onHide={() => setShowTransactionModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src="/transaction.png"
            alt="Transaction"
            className="img-fluid mb-3"
            style={{ maxWidth: '150px' }}
          />
          <div
            className="d-flex justify-content-center align-items-center border p-3 rounded"
            style={{ fontSize: '1.2rem', backgroundColor: '#f1f3f5' }}
          >
            <span className="me-2 fw-bold">{transactionId}</span>
            <FaRegCopy onClick={handleCopy} style={{ cursor: 'pointer' }} title="Copy" />
          </div>
          <p className="text-muted mt-3">Use this ID for transaction tracking or customer support.</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}
