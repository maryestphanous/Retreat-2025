// src/components/TeamFormModal.jsx
import { useState } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function TeamFormModal({ team, onClose }) {
  const isEdit     = Boolean(team);
  const [name, setName]   = useState(team?.name || '');
  const [score, setScore] = useState(team?.score || 0);
  const [saving, setSaving] = useState(false);

  const save = async e => {
    e.preventDefault();
    setSaving(true);

    const payload = { name, score: Number(score) };
    try {
      if (isEdit) {
        await updateDoc(doc(db, 'teams', team.id), payload);
      } else {
        await addDoc(collection(db, 'teams'), payload);
      }
    } catch (err) {
      console.error('Save failed:', err);
      alert('Could not save team. Try again.');
      setSaving(false);
      return;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <form
        onSubmit={save}
        className="bg-white rounded-lg shadow-lg w-80 p-6 ring-1 ring-gray-200 space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          {isEdit ? 'Edit Team' : 'Add Team'}
        </h2>

        <label className="block text-gray-700 text-sm">
          Team name <span className="text-red-500">*</span>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            disabled={saving}
            className="mt-1 w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        <label className="block text-gray-700 text-sm">
          Score
          <input
            type="number"
            value={score}
            onChange={e => setScore(e.target.value)}
            required
            disabled={saving}
            className="mt-1 w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-gray-700 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!name.trim() || saving}
            className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-white disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
