import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import teamColor from '../utils/teamColor';

export default function TeamBar({ team, isAdmin, onEdit, maxScore }) {
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

  const widthPercent =
    maxScore > 0 ? `${(team.score / maxScore) * 100}%` : '0%';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center space-x-4 hover:shadow-lg transition">
      {/* avatar */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0"
        style={{ background: `${color}22`, color }}
      >
        {initials || '#'}
      </div>

      {/* name + bar */}
      <div className="flex-1">
        <div className="flex justify-between mb-1 items-baseline">
          <span className="text-2xl font-semibold text-gray-800">
            {team.name}
          </span>
          <span className="text-2xl font-semibold text-gray-800">
            {team.score}
          </span>
        </div>
        <div className="w-full bg-gray-200 h-4 rounded">
          <div
            className="h-4 rounded"
            style={{ width: widthPercent, background: color }}
          />
        </div>
      </div>

      {/* admin controls */}
      {isAdmin && (
        <div className="flex flex-col space-y-2 flex-shrink-0">
          <button
            onClick={increment}
            className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 text-sm"
          >
            +1
          </button>
          <button
            onClick={onEdit}
            className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-400 text-sm"
          >
            Edit
          </button>
          <button
            onClick={remove}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400 text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
