import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../api/store/useAuthStore';

export default function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide text-blue-400">
          NewsPortal
        </Link>
        <nav className="flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/news" className="hover:text-blue-400 transition">All News</Link>
          <Link to="/contact" className="hover:text-blue-400 transition">Contact Us</Link>
          {user ? (
            <>
              <Link to="/create-news" className="bg-blue-600 px-3 py-1.5 rounded hover:bg-blue-700 transition">
                Publish News
              </Link>
              <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
              <button onClick={handleLogout} className="bg-red-600 px-3 py-1.5 rounded hover:bg-red-700 transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
              <Link to="/register" className="bg-blue-600 px-3 py-1.5 rounded hover:bg-blue-700 transition">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}