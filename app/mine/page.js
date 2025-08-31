"use client";

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import Navbar from '../component/header';
import { encryptData, decryptData } from '../utils/crypo';

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

  // Check auth
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  // Load encrypted bank data from cookie
  useEffect(() => {
    const encrypted = Cookies.get('bankData');
    if (encrypted) {
      try {
        const data = decryptData(encrypted);
        setBankAccounts(data);
        if (data.length > 0) setSelectedId(data[0].id);
      } catch (err) {
        console.error('Decryption failed', err);
      }
    }
  }, []);

  // Save encrypted bank data to cookie
  useEffect(() => {
    const encrypted = encryptData(bankAccounts);
    Cookies.set('bankData', encrypted, {
      secure: true,
      sameSite: 'Strict',
      expires: 7 // days
    });
  }, [bankAccounts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAccount = {
      id: uuidv4().slice(0, 8),
      ...formData
    };
    setBankAccounts(prev => [newAccount, ...prev]);
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
    <div className="min-vh-100 d-flex flex-column" style={{ background: '#f7f9fc' }}>
      <Navbar />

      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-start pt-5 px-4" style={{ width: '100%' }}>
        <h2 className="text-primary">💳 Manage Your Bank Accounts</h2>

        {!formVisible && (
          <button className="btn btn-success mb-4" onClick={() => setFormVisible(true)}>
            ➕ Add Bank Account
          </button>
        )}

        {formVisible && (
          <form className="bg-white p-4 rounded shadow w-100 mb-4" style={{ maxWidth: 900 }} onSubmit={handleSubmit}>
            <div className="row g-3">
              {["accountHolderName", "accountNumber", "ifscCode", "bankName", "branchName", "accountType", "mobile", "email"].map((field, i) => (
                <div className="col-md-6" key={i}>
                  <label className="form-label">{field.replace(/([A-Z])/g, ' $1')}</label>
                  {field === "accountType" ? (
                    <select name={field} className="form-select" value={formData[field]} onChange={handleChange} required>
                      <option value="">Select type</option>
                      <option value="Savings">Savings</option>
                      <option value="Current">Current</option>
                    </select>
                  ) : (
                    <input
                      type={field === "email" ? "email" : field === "mobile" ? "tel" : "text"}
                      name={field}
                      className="form-control"
                      value={formData[field]}
                      onChange={handleChange}
                      required={field !== "branchName" && field !== "mobile" && field !== "email"}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary me-2">Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => setFormVisible(false)}>Cancel</button>
            </div>
          </form>
        )}

        {bankAccounts.length === 0 ? (
          <p className="text-muted">No bank accounts added yet.</p>
        ) : (
          <div className="row justify-content-center w-100" style={{ maxWidth: 900 }}>
            {bankAccounts.map(account => (
              <div className="col-md-6 mb-4" key={account.id}>
                <div className={`card p-4 shadow ${selectedId === account.id ? 'border-primary' : ''}`}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">{account.accountHolderName}</h5>
                    <input type="radio" name="selectedAccount" checked={selectedId === account.id} onChange={() => setSelectedId(account.id)} />
                  </div>
                  <ul className="list-unstyled small">
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
