import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import Spinner from './Spinner';

const Register = () => {
  const [email,setEmail] = useState('');
  const [mobile,setMobile] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/register', {email, mobile, password});
      alert('Registration successful! Please login after admin approval.');
      navigate('/login');
    } catch(err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    div className="auth-container">
      h2>Register/h2>
      {error && div className="error-msg">{error}/div>}
      form onSubmit={handleSubmit}>
        input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
          />
        input 
          type="text" 
          placeholder="Mobile Number" 
          value={mobile} 
          onChange={e => setMobile(e.target.value)} 
          required
          />
        input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required
          />
        button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}/button>
      /form>
      p>
        Already registered? Link to="/login">Login here/Link>
      /p>
    /div>
  );
};

export default Register;