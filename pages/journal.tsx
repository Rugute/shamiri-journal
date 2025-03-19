import { useState, useEffect } from 'react';
import JournalEntry from '../components/JournalEntry';

export default function Home() {
    const [entries, setEntries] = useState<{ id: number; title: string; content: string; category: string }[]>([]);
  
    useEffect(() => {
      fetch('/api/journals')
        .then((res) => res.json())
        .then((data) => {
          const formattedData = data.map((entry: any) => ({
            id: entry.id,
            title: entry.title || '',
            content: entry.content || '',
            category: entry.category || '',
          }));
          setEntries(formattedData);
        });
    }, []);
  
    const handleDelete = async (id: number) => {
      await fetch('/api/journals', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setEntries(entries.filter(entry => entry.id !== id));
    };
  
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">My Journal</h1>
        {entries.map((entry) => (
          <JournalEntry key={entry.id} entry={entry} onDelete={handleDelete} />
        ))}
      </div>
    );
  }