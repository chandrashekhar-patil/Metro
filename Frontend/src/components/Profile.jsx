import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

const genders = ['Male', 'Female', 'Other'];
const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other'];

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: 'Male',
    religion: 'Hindu',
    location: '',
    bio: '',
    photoUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await api.get('/profile');
        setProfile(data.profile);
      } catch {
        alert('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await api.put('/profile', profile);
      setMessage('Profile updated. Waiting for admin approval.');
    } catch {
      setMessage('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="container">
      <h2>My Profile</h2>
      {message && <div className="info-msg">{message}</div>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          required
        />

        <label>Age:</label>
        <input
          name="age"
          type="number"
          min="18"
          max="70"
          value={profile.age}
          onChange={handleChange}
          required
        />

        <label>Gender:</label>
        <select
          name="gender"
          value={profile.gender}
          onChange={handleChange}
        >
          {genders.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <label>Religion:</label>
        <select
          name="religion"
          value={profile.religion}
          onChange={handleChange}
        >
          {religions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <label>Location:</label>
        <input
          name="location"
          value={profile.location}
          onChange={handleChange}
          required
        />

        <label>Bio:</label>
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          rows="4"
        />

        <label>Photo URL:</label>
        <input
          name="photoUrl"
          value={profile.photoUrl}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={saving}
          key="save-btn"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
      <button
        className="logout-btn"
        onClick={logout}
        key="logout-btn"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;