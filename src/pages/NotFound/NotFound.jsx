import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2 style={{ fontSize: '3rem', color: '#e74c3c', margin: '0 0 1rem 0' }}>404</h2>
      <h3>Resource not found</h3>
      <Link to="/" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>
        Return to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;