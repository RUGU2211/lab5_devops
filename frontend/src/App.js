import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async (userData) => {
    try {
      const response = await axios.post('/api/users', userData);
      setUsers([...users, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MERN Docker Application</h1>
        <UserForm onSubmit={addUser} />
        <div className="users-list">
          <h2>Users ({users.length})</h2>
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Age: {user.age}</p>
              <p>City: {user.city}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
