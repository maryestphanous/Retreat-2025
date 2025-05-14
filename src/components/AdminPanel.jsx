import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export default function AdminPanel({ onClose }) {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [score, setScore] = useState(0);

  async function save(e) {
    e.preventDefault();
    await addDoc(collection(db, 'teams'), {
      name,
      photoUrl: photo,
      score: +score,
    });
    setName(''); setPhoto(''); setScore(0);
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Add Team</h3>
        <form onSubmit={save} className="flex flex-col gap-3">
          <input
            className="input input-bordered"
            placeholder="Team name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            className="input input-bordered"
            placeholder="Photo URL"
            value={photo}
            onChange={e => setPhoto(e.target.value)}
          />
          <input
            type="number"
            className="input input-bordered"
            placeholder="Starting score"
            value={score}
            onChange={e => setScore(e.target.value)}
          />
          <div className="modal-action">
            <button className="btn btn-primary" type="submit">Save</button>
            <button className="btn" type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}
