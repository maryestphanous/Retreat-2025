// src/components/TeamBoard.jsx
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import TeamCard from './TeamCard';
import TeamBar  from './TeamBar';

export default function TeamBoard({ isAdmin, onEdit, view }) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'teams'), orderBy('score', 'desc'));
    return onSnapshot(q, snap =>
      setTeams(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, []);

  if (view === 'bars') {
    const maxScore = Math.max(0, ...teams.map(t => t.score || 0));
    return (
      <div className="p-4 space-y-4">
        {teams.map(team => (
          <TeamBar
            key={team.id}
            team={team}
            isAdmin={isAdmin}
            onEdit={() => onEdit(team)}
            maxScore={maxScore}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {teams.map(team => (
        <TeamCard
          key={team.id}
          team={team}
          isAdmin={isAdmin}
          onEdit={() => onEdit(team)}
        />
      ))}
    </div>
  );
}
