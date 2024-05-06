import React, { useState } from 'react';
import './App.css';

const initialData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password1' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: 'password2' },
  { id: 3, name: 'Tom Smith', email: 'tom@example.com', password: 'password3' }
];

const CrudApp = () => {
  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', id: null });

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: '', email: '', password: '', id: null });
  };

  const handleShowModal = (item) => {
    setFormData({ name: item.name, email: item.email, password: item.password, id: item.id });
    setShowModal(true);
  };

  const handleSave = () => {
    if (formData.id) {
      const newData = data.map(item =>
        item.id === formData.id ? { ...item, name: formData.name, email: formData.email, password: formData.password } : item
      );
      setData(newData);
    } else {
      const newData = [...data, { id: data.length + 1, name: formData.name, email: formData.email, password: formData.password }];
      setData(newData);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  };

  return (
    <div className="container">
      <h1>CRUD Application</h1>
      <button className="add-btn" onClick={() => setShowModal(true)}>Add User</button>
      <table className="data-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>
                <button className="edit-btn" onClick={() => handleShowModal(item)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div>
          <div className="modal-bg" onClick={handleCloseModal}></div>
          <div className="modal">
            <h2>{formData.id ? 'Edit User' : 'Add User'}</h2>
            <input
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudApp;
