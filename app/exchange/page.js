/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import Navbar from '../component/header';
import Slider from 'react-slick';

export default function ExchangePage() {
  const [seconds, setSeconds] = useState(60);

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

  const Toasters = () => {
    toast.success('Logged in successfully!');
  };

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
      name: 'Harsh P.',
      role: 'Trader',
      img: '/users/user3.jpg',
      rating: 5,
      text: 'Very user-friendly interface and quick support. My INR was credited without any delays.',
    },
    {
      name: 'Kane P.',
      role: 'Trader',
      img: '/users/user3.jpg',
      rating: 5,
      text: 'Very user-friendly interface and quick support. My INR was credited without any delays.',
    }, 
       {
      name: 'Mr. SMith P.',
      role: 'Trader',
      img: '/users/user3.jpg',
      rating: 5,
      text: 'Very user-friendly interface and quick support. My INR was credited without any delays.',
    },
  ];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,        // Enables auto-sliding
  autoplaySpeed: 3000,   // 3 seconds per slide
  pauseOnHover: true,    // Optional: pause when hovered
  responsive: [
    { breakpoint: 992, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};



  return (
    <div style={{ backgroundColor: '#f8f9fc', minHeight: '100vh', position: 'relative' }}>
      <Navbar />

      <div
        className="banner-section d-flex align-items-center text-center text-white"
        style={{
          background: 'linear-gradient(135deg, #4f46e5, #3b82f6)',
          minHeight: '320px',
          padding: '60px 20px',
        }}
      >
        <Container>
          <h1 style={{ fontWeight: '700', fontSize: '3rem' }}>Buy & Sell USDT at the Best Rates</h1>
          <p style={{ fontSize: '1.25rem', marginTop: '18px' }}>
            Secure, Fast, and Transparent — Trusted by thousands.
          </p>
        </Container>
      </div>

      {/* === Exchange Content === */}
      <Container className="py-5">
        {/* Exchange Rate Box */}
        <Card
          className="shadow-lg mb-5 px-4 py-5"
          style={{
            borderRadius: '30px',
            minHeight: '220px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Row className="align-items-center w-100">
            <Col md={6}>
              <h2 className="fw-bold text-purple fs-2">Current Exchange Rate</h2>
              <div className="text-primary fs-5">Auto-refresh in {seconds}s</div>
            </Col>
            <Col md={3} className="text-center mt-4 mt-md-0">
              <Button
                variant="success"
                size="lg"
                style={{ borderRadius: '14px', padding: '12px 28px' }}
                onClick={Toasters}
              >
                Sell Now
              </Button>
            </Col>
            <Col md={3} className="text-end mt-4 mt-md-0">
              <div style={{ fontSize: '3rem', fontWeight: '700', color: '#1e2a78' }}>
                95{' '}
                <Badge bg="warning" text="dark" style={{ fontSize: '0.8rem', verticalAlign: 'top' }}>
                  BASE
                </Badge>
              </div>
              <div className="text-muted small">1 USDT = ₹95</div>
            </Col>
          </Row>
        </Card>

        {/* Rate Cards */}
        <Row className="g-4">
          {rates.map((rate, index) => (
            <Col xs={12} md={4} key={index}>
              <Card
                className="shadow-sm text-center"
                style={{
                  borderRadius: '20px',
                  padding: '25px',
                  minHeight: '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <h5 className="fw-bold fs-4">${rate.usd}</h5>
                <div className="text-primary fs-5">₹{rate.inr}</div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Footer Message */}
        <div className="text-center mt-5">
          <div
            style={{
              backgroundColor: '#3a0ca3',
              color: 'white',
              padding: '16px 24px',
              borderRadius: '14px',
              display: 'inline-block',
              fontWeight: '500',
              fontSize: '1rem',
            }}
          >
            No external wallets, no shady processes — lifetime fund protection guaranteed.
          </div>
        </div>
      </Container>

      {/* === Platform Advantage Section === */}
      <Container className=" shadow-lg mb-15 px-16 py-5">
        <h3 className="fw-bold mb-4 text-center text-dark">Platform Advantage</h3>
        <Row className="g-4">
          {[
            {
              title: '24/7 Support',
              desc: 'Got a problem? Just get in touch. Our customer service support team is available 24/7.',
              icon: '🕐',
            },
            {
              title: 'No Transaction Fee',
              desc: 'Zero transaction fees guaranteed, every time, with no hidden charges or deductions.',
              icon: '💸',
            },
            {
              title: 'Best In Market',
              desc: 'We offer the highest price for your USDT, beating all market rates.',
              icon: '📈',
            },
            {
              title: 'Reliable Security',
              desc: 'Our sophisticated security measures protect your cryptocurrency from all risks.',
              icon: '🔒',
            },
          ].map((item, idx) => (
            <Col key={idx} xs={12} md={6}>
              <Card
                className="h-100 shadow-sm border-0"
                style={{ borderRadius: '18px', padding: '20px' }}
              >
                <div className="d-flex align-items-start">
                  <div style={{ fontSize: '2rem', marginRight: '15px' }}>{item.icon}</div>
                  <div>
                    <h5 className="fw-bold">{item.title}</h5>
                    <p className="text-muted mb-0">{item.desc}</p>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* === Testimonials Section === */}
      <Container className="mt-5 pb-5">
        <h3 className="fw-bold mb-4 text-center text-dark">Testimonials</h3>
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="px-3">
              <Card
                className="border-0 shadow-sm h-100"
                style={{ borderRadius: '18px', padding: '24px' }}
              >
                <div className="mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} style={{ color: '#fbbf24', fontSize: '1.2rem' }}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-muted">{item.text}</p>
                <div className="d-flex align-items-center mt-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginRight: '15px',
                    }}
                  />
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

      {/* WhatsApp Floating Icon */}
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
    </div>
  );
}
