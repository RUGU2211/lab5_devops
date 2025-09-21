import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    city: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      await onSubmit(formData);
      setFormData({ name: '', email: '', age: '', city: '' });
      setMessage('User added successfully!');
    } catch (error) {
      setMessage('Error adding user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-form">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add User'}
        </button>
      </form>
      {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
    </div>
  );
};

export default UserForm;
