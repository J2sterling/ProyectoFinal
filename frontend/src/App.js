import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  // Configuración de la API
  const API_BASE = window.location.hostname === 'localhost'
    ? 'http://192.168.50.5:3001'
    : 'https://ec2-3-23-87-124.us-east-2.compute.amazonaws.com:3001';

  // Crear instancia de axios configurada para desarrollo
  const apiInstance = axios.create({
    baseURL: API_BASE,
    // Nota: httpsAgent solo funciona en Node.js, no en el navegador
  });

  // Para el navegador, necesitamos una solución diferente
  useEffect(() => {
    // Usar la instancia configurada
    apiInstance.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error('Error fetching users:', err);
        // Si falla HTTPS, intentar con HTTP como fallback
        if (API_BASE.startsWith('https')) {
          const httpAPI = API_BASE.replace('https://', 'http://');
          axios.get(`${httpAPI}/users`)
            .then(res => setUsers(res.data))
            .catch(err2 => console.error('Error with HTTP fallback:', err2));
        }
      });
  }, [API_BASE]);

  const addUser = async () => {
    if (!name.trim()) return;

    try {
      const res = await apiInstance.post('/users', { name });
      setUsers([...users, res.data]);
      setName('');
    } catch (err) {
      console.error('Error adding user:', err);
      // Fallback a HTTP si HTTPS falla
      if (API_BASE.startsWith('https')) {
        const httpAPI = API_BASE.replace('https://', 'http://');
        try {
          const res = await axios.post(`${httpAPI}/users`, { name });
          setUsers([...users, res.data]);
          setName('');
        } catch (err2) {
          console.error('Error with HTTP fallback:', err2);
        }
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>User Management</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter user name"
          style={{
            marginRight: '10px',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
          onKeyPress={(e) => e.key === 'Enter' && addUser()}
        />
        <button
          onClick={addUser}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add User
        </button>
      </div>

      <h2>Users List</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.length > 0 ? (
          users.map(user => (
            <li
              key={user.id}
              style={{
                padding: '10px',
                margin: '5px 0',
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '4px'
              }}
            >
              {user.name}
            </li>
          ))
        ) : (
          <li style={{ color: '#6c757d' }}>No users found</li>
        )}
      </ul>
    </div>
  );
}

export default App;
