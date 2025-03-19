
import { useState } from 'react';

interface JournalEntryProps {
  entry: {
    title: string;
    content: string;
    category: string;
    id: number;
  };
  onDelete: (id: number) => void;
}


  export default function JournalEntry({ entry }: JournalEntryProps & { onDelete: (id: number) => void }) {
    function onDelete(id: number): void {
      throw new Error('Function not implemented.');
    }

    function onEdit(entry: { title: string; content: string; category: string; id: number; }): void {
      throw new Error('Function not implemented.');
    }

    return (
      <div className="border p-4 rounded-lg">
        <h2 className="text-lg font-bold">{entry.title}</h2>
        <p>{entry.content}</p>
        <span className="text-sm text-gray-500">{entry.category}</span>
        <button className="bg-blue-500 text-white p-2 mt-2 rounded" onClick={() => onEdit(entry)}>Edit</button>
        <button className="bg-red-500 text-white p-2 mt-2 rounded" onClick={() => onDelete(entry.id)}>Delete</button>
      </div>
    );
  }