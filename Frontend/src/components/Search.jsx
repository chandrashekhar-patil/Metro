import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from './Spinner';

const genders = ['', 'Male', 'Female', 'Other'];
const religions = ['', 'Hindu', 'Muslim', 'Christian', 'Sikh', 'Other'];

const Search = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    ageMin: '', ageMax: '', gender: '', religion: '', location: '', keyword: '',
  });

  useEffect(() => {
    fetchProfiles();
    // eslint-disable-next-line
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const params = {};
      Object.entries(filters).forEach(([k,v])=>{
        if(v) params[k] = v;
      });
      const { data } = await api.get('/search', { params });
      setProfiles(data);
    } catch {
      alert('Failed to load profiles.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
  };

  const handleSearch = e => {
    e.preventDefault();
    fetchProfiles();
  };

  return (
    <div className="container">
      <h2>Search Matches</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          name="keyword"
          placeholder="Keyword"
          value={filters.keyword}
          onChange={handleChange}
        />
        <input
          type="number"
          name="ageMin"
          placeholder="Min Age"
          min="18"
          max="70"
          value={filters.ageMin}
          onChange={handleChange}
        />
        <input
          type="number"
          name="ageMax"
          placeholder="Max Age"
          min="18"
          max="70"
          value={filters.ageMax}
          onChange={handleChange}
        />
        <select name="gender" value={filters.gender} onChange={handleChange}>
          {genders.map((g,i) => (
            <option key={i} value={g}>
              {g || 'Any'}
            </option>
          ))}
        </select>
        <select name="religion" value={filters.religion} onChange={handleChange}>
          {religions.map((r,i) => (
            <option key={i} value={r}>
              {r || 'Any'}
            </option>
          ))}
        </select>
        <input
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <Spinner />
      ) : profiles.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <div className="profiles-list">
          {profiles.map(({ id, profile }) => (
            <div key={id} className="profile-card">
              {profile.photoUrl ? (
                <img src={profile.photoUrl} alt={profile.name} />
              ) : (
                <div className="avatar-placeholder">{profile.name?.[0]}</div>
              )}
              <div className="profile-info">
                <h3>{profile.name || 'Unknown'}</h3>
                <p>{profile.age} years, {profile.gender}</p>
                <p>{profile.religion}</p>
                <p>{profile.location}</p>
                <p>{profile.bio}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="nav-buttons">
        <button onClick={() => navigate('/profile')}>My Profile</button>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
};

export default Search;