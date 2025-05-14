// src/App.jsx
import { useState } from 'react';
import LoginModal    from './components/LoginModal';
import TeamBoard     from './components/TeamBoard';
import TeamFormModal from './components/TeamFormModal';
import './index.css';

export default function App() {
  const [isAdmin,    setIsAdmin]    = useState(false);
  const [showLogin,  setShowLogin]  = useState(false);
  const [showForm,   setShowForm]   = useState(false);
  const [editTeam,   setEditTeam]   = useState(null);
  const [view,       setView]       = useState('cards');

  const openLogin  = () => setShowLogin(true);
  const handleLogin = code => {
    if (code === '195423') {
      setIsAdmin(true);
      setShowLogin(false);
    } else alert('Incorrect code');
  };

  const openAdd  = () => { setEditTeam(null); setShowForm(true); };
  const openEdit = team => { setEditTeam(team); setShowForm(true); };
  const closeForm = () => setShowForm(false);

  const toggleView = () =>
    setView(v => (v === 'cards' ? 'bars' : 'cards'));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-blue-600 text-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          2025 Sunday School / Scouts Retreat
        </h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleView}
            className="px-3 py-1 bg-indigo-500 hover:bg-indigo-400 rounded"
          >
            {view === 'cards' ? 'Bar View' : 'Card View'}
          </button>
          {isAdmin ? (
            <button
              onClick={openAdd}
              className="px-3 py-1 bg-green-500 hover:bg-green-400 rounded"
            >
              + Add Team
            </button>
          ) : (
            <button
              onClick={openLogin}
              className="px-3 py-1 bg-white text-blue-600 hover:bg-gray-200 rounded font-semibold"
            >
              Admin
            </button>
          )}
        </div>
      </header>

      {/* BOARD */}
      <TeamBoard
        isAdmin={isAdmin}
        onEdit={openEdit}
        view={view}
      />

      {/* MODALS */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onConfirm={handleLogin}
        />
      )}
      {showForm && (
        <TeamFormModal
          team={editTeam}
          onClose={closeForm}
        />
      )}
    </div>
  );
}
