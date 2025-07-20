import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const App = () => (
  <Router>
    <div style={styles.container}>
      <nav style={styles.nav}>
        <Link to="/register" style={styles.link}>Register</Link>
        <Link to="/login" style={styles.link}>Login</Link>
      </nav>
      <main style={styles.main}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Register />} />
        </Routes>
      </main>
    </div>
  </Router>
);

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f6fa',
    fontFamily: 'Segoe UI, Arial, sans-serif',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    padding: '2rem 0 1rem 0',
    background: '#273c75',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '80vh',
  },
};

export default App;
