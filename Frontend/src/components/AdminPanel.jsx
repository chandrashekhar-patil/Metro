import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

const AdminPanel = () => {
  const { logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/users');
      setUsers(data);
    } catch {
      alert('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (id) => {
    try {
      await api.post(/admin/users/${id}/approve);
      fetchUsers();
    } catch {
      alert('Failed to approve user');
    }
  };

  const rejectUser = async (id) => {
    try {
      await api.post(/admin/users/${id}/reject);
      fetchUsers();
    } catch {
      alert('Failed to reject user');
    }
  };

  return (
    div className="container">
      h2>Admin Panel/h2>
      {loading ? (
        Spinner />
      ) : (
        table className="admin-table">
          thead>
            tr>
              th>Email/th>
              th>Mobile/th>
              th>Name/th>
              th>Approved/th>
              th>Actions/th>
            /tr>
          /thead>
          tbody>
            {users.map(u => (
              tr key={u.id}>
                td>{u.email}/td>
                td>{u.mobile}/td>
                td>{u.profile?.name || '-'}/td>
                td>{u.approved ? 'Yes' : 'No'}/td>
                td>
                  button onClick={() => approveUser(u.id)}>Approve/button>{' '}
                  button onClick={() => rejectUser(u.id)}>Reject/button>
                /td>
              /tr>
            ))}
          /tbody>
        /table>
      )}
      button className="logout-btn" onClick={logout}>Logout/button>
    /div>
  );
};

export default AdminPanel;