"use client"
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

  return (
    <div
      className="container-fluid min-vh-100 py-5 px-3"
      style={{
        background: '#f7f9fc',
        fontFamily: 'Segoe UI, sans-serif'
      }}
    >
      <style jsx>{`
        .card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .card:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        }

        .selected-card {
          border: 2px solid #0d6efd !important;
        }

        .add-btn {
          font-size: 1.1rem;
          padding: 0.6rem 1.5rem;
          border-radius: 8px;
        }

        .form-container {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
        }
      `}</style>

      <h2 className="text-center text-primary mb-4">💳 Manage Your Bank Accounts</h2>

      {!formVisible && (
        <div className="text-center mb-4">
          <button className="btn btn-success add-btn" onClick={() => setFormVisible(true)}>
            ➕ Add Bank Account
          </button>
        </div>
      )}

      {formVisible && (
        <form className="p-4 form-container mb-5 mx-auto" style={{ maxWidth: '900px' }} onSubmit={handleSubmit}>
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
        <p className="text-center text-muted">No bank accounts added yet.</p>
      ) : (
        <div className="row justify-content-center">
          {bankAccounts.map((account) => (
            <div className="col-md-6 col-lg-5 mb-4" key={account.id}>
              <div className={`card shadow-sm p-3 ${selectedId === account.id ? 'selected-card' : ''}`}>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-primary mb-3">{account.accountHolderName}</h5>
                  <div>
                    <input
                      type="radio"
                      name="selectedAccount"
                      checked={selectedId === account.id}
                      onChange={() => setSelectedId(account.id)}
                      className="form-check-input"
                    />
                  </div>
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
    </div>
  );
}
