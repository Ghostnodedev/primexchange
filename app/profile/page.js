"use client"
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../component/header';

export default function BankPage() {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    accountType: '',
    mobile: '',
    email: ''
  });

  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('bankAccounts')) || [];
    setBankAccounts(storedData);
    if (storedData.length > 0) {
      setSelectedId(storedData[0].id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bankAccounts', JSON.stringify(bankAccounts));
  }, [bankAccounts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAccount = {
      id: uuidv4().slice(0, 8),
      ...formData
    };

    setBankAccounts((prev) => [newAccount, ...prev]);
    setFormData({
      accountHolderName: '',
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      branchName: '',
      accountType: '',
      mobile: '',
      email: ''
    });

    setFormVisible(false);
  };

  if (isAuthenticated === null) return null;

  if (!isAuthenticated) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h3>Please login to continue</h3>
          <a href="/login" className="btn btn-primary mt-3">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: '#f7f9fc',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <Navbar />

      <main
        className="flex-grow-1 d-flex flex-column align-items-center justify-content-start pt-5 px-4"
        style={{ width: '100%' }}
      >
        <style jsx>{`
          .card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            border-radius: 10px;
          }

          .card:hover {
            transform: scale(1.02);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          }

          .selected-card {
            border: 2px solid #0d6efd !important;
            box-shadow: 0 0 10px #0d6efd66;
          }

          .add-btn {
            font-size: 1.1rem;
            padding: 0.8rem 2rem;
            border-radius: 10px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.4rem;
          }

          .form-container {
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
            width: 100%;
            max-width: 900px;
          }

          h2 {
            font-weight: 700;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            gap: 0.6rem;
            color: #0d6efd;
          }

          p.text-muted {
            font-size: 1.1rem;
            margin-top: 2rem;
          }

          .bank-list {
            max-width: 900px;
            width: 100%;
          }
        `}</style>

        <h2>
          <span role="img" aria-label="card">💳</span> Manage Your Bank Accounts
        </h2>

        {!formVisible && (
          <div className="d-flex justify-content-center mb-4 w-100" style={{ maxWidth: '900px' }}>
            <button className="btn btn-success add-btn" onClick={() => setFormVisible(true)}>
              ➕ Add Bank Account
            </button>
          </div>
        )}

        {formVisible && (
          <form className="p-4 form-container mb-5" onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Account Holder Name</label>
                <input type="text" className="form-control" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Account Number</label>
                <input type="text" className="form-control" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
              </div>

              <div className="col-md-6">
                <label className="form-label">IFSC Code</label>
                <input type="text" className="form-control" name="ifscCode" value={formData.ifscCode} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Bank Name</label>
                <input type="text" className="form-control" name="bankName" value={formData.bankName} onChange={handleChange} required />
              </div>

              <div className="col-md-6">
                <label className="form-label">Branch Name</label>
                <input type="text" className="form-control" name="branchName" value={formData.branchName} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Account Type</label>
                <select className="form-select" name="accountType" value={formData.accountType} onChange={handleChange} required>
                  <option value="">Select type</option>
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Mobile</label>
                <input type="tel" className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary px-4 me-2">Save</button>
              <button type="button" className="btn btn-secondary px-4" onClick={() => setFormVisible(false)}>Cancel</button>
            </div>
          </form>
        )}

        {bankAccounts.length === 0 ? (
          <p className="text-center text-muted bank-list">No bank accounts added yet.</p>
        ) : (
          <div className="row justify-content-center bank-list">
            {bankAccounts.map((account) => (
              <div className="col-md-6 col-lg-5 mb-4" key={account.id}>
                <div className={`card shadow-sm p-4 ${selectedId === account.id ? 'selected-card' : ''}`}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="text-primary mb-0">{account.accountHolderName}</h5>
                    <input
                      type="radio"
                      name="selectedAccount"
                      checked={selectedId === account.id}
                      onChange={() => setSelectedId(account.id)}
                      className="form-check-input"
                    />
                  </div>
                  <ul className="list-unstyled mb-0">
                    <li><strong>ID:</strong> {account.id}</li>
                    <li><strong>Account #:</strong> {account.accountNumber}</li>
                    <li><strong>Bank:</strong> {account.bankName}</li>
                    <li><strong>IFSC:</strong> {account.ifscCode}</li>
                    <li><strong>Branch:</strong> {account.branchName}</li>
                    <li><strong>Type:</strong> {account.accountType}</li>
                    <li><strong>Mobile:</strong> {account.mobile}</li>
                    <li><strong>Email:</strong> {account.email}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
