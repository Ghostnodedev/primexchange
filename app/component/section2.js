import './step2.css';

export default function StepsSection() {
  const steps = [
    {
      number: '1',
      title: 'Register & Secure Your Account',
      desc: 'Sign up with your email and phone. Set a transaction password to secure your funds.',
    },
    {
      number: '2',
      title: 'Deposit USDT to Start Trading',
      desc: 'Send USDT to your unique wallet address. Enter your TXID to verify the deposit.',
    },
    {
      number: '3',
      title: 'Sell & Receive INR',
      desc: 'Sell USDT instantly and receive INR directly in your bank account.',
    },
  ];

  return (
    <section className="steps-section">
      <div className="steps-content">
        {steps.map((step, index) => (
          <div key={step.number} className="step-wrapper">
            <div className="circle">
              {step.number}
              {index < steps.length - 1 && <div className="dotted-line" />}
            </div>
            <div className="step-details">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
