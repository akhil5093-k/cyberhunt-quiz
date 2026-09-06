import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

// Only this email is allowed as admin
const ADMIN_EMAIL = 'akhilnayak509321@gmail.com';

/**
 * AdminLogin Component
 * Uses Firebase Authentication to verify admin credentials.
 * Only the registered admin email is permitted.
 */
const AdminLogin = ({ onSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      setError('Access denied. You are not an admin.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      onSuccess();
    } catch (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/user-not-found') {
        setError('Admin account not found.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Try again later.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="firebase-admin-overlay">
      <div className="firebase-admin-modal" style={{ maxWidth: '400px' }}>
        <div className="admin-header">
          <h2>⚙️ Admin Login</h2>
          <button onClick={onCancel} className="close-btn">×</button>
        </div>

        <div className="admin-content">
          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="admin@example.com"
                required
                autoFocus
              />
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="admin-message error" style={{ marginBottom: '12px' }}>
                {error}
              </div>
            )}

            <div className="button-group">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Verifying...' : 'Login'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
