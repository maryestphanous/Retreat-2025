import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import teamColor from '../utils/teamColor';

export default function TeamCard({ team, isAdmin, onEdit }) {
  const initials = team.name
    .split(' ')
    .map(w => w[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2);

  const color = teamColor(team.id);                 // ← new

  const increment = async () =>
    await updateDoc(doc(db, 'teams', team.id), {
      score: (team.score || 0) + 1,
    });

  const remove = async () => {
    if (window.confirm(`Delete team “${team.name}”? This cannot be undone.`)) {
      await deleteDoc(doc(db, 'teams', team.id));
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
      {/* colored avatar */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mb-4"
        style={{ background: `${color}22`, color }}
      >
        {initials || '#'}
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-1">{team.name}</h3>

      <p className="text-gray-600 mb-4">
        Score:{' '}
        <span className="text-2xl font-bold text-gray-800">
          {team.score || 0}
        </span>
      </p>

      {isAdmin && (
        <>
          <button
            onClick={increment}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition mb-2"
          >
            +1 Point
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition text-sm mb-2"
          >
            Edit
          </button>
          <button
            onClick={remove}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition text-sm"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
