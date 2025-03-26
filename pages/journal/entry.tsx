import AdminLayout from '@/components/layouts/AdminLayout';
import React, { useState } from 'react';

interface JournalEntry {
    id: string;
    title: string;
    content: string;
    category: string;
    date: string;
}

const Entry: React.FC = () => {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [entry, setEntry] = useState<JournalEntry>({
        id: '',
        title: '',
        content: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEntry((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (entry.id) {
            setEntries((prev) =>
                prev.map((item) => (item.id === entry.id ? entry : item))
            );
        } else {
            const newEntry = { ...entry, id: Date.now().toString() };
            setEntries((prev) => [newEntry, ...prev]);
        }

        setEntry({
            id: '',
            title: '',
            content: '',
            category: '',
            date: new Date().toISOString().split('T')[0],
        });
        setIsModalOpen(false); // Close the modal after submission
    };

    const handleEdit = (id: string) => {
        const entryToEdit = entries.find((item) => item.id === id);
        if (entryToEdit) {
            setEntry(entryToEdit);
            setIsModalOpen(true); // Open the modal for editing
        }
    };

    const handleDelete = (id: string) => {
        setEntries((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Journal Entries</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mb-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Add New Entry
                </button>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4">{entry.id ? 'Edit Entry' : 'New Entry'}</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={entry.title}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
                                    <textarea
                                        id="content"
                                        name="content"
                                        value={entry.content}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={entry.category}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={entry.date}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        {entry.id ? 'Update Entry' : 'Save Entry'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <h2 className="text-2xl font-semibold mt-8 mb-4">Existing Entries</h2>
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {entries.map((item) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.content}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(item.id)}
                                            className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                import('sweetalert2').then((Swal) => {
                                                    Swal.default.fire({
                                                        title: 'Are you sure?',
                                                        text: 'You won\'t be able to revert this!',
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#d33',
                                                        cancelButtonColor: '#3085d6',
                                                        confirmButtonText: 'Yes, delete it!'
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            handleDelete(item.id);
                                                            Swal.default.fire(
                                                                'Deleted!',
                                                                'Your entry has been deleted.',
                                                                'success'
                                                            );
                                                        }
                                                    });
                                                });
                                            }}
                                            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default Entry;