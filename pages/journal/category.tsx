import AdminLayout from '@/components/layouts/AdminLayout';
import React, { useState, useEffect } from 'react';

interface journalcategory {
    id: string;
    category: string;
    date: string;
}

const JournalCategory: React.FC = () => {
    const [entries, setEntries] = useState<journalcategory[]>([]);
    const [entry, setEntry] = useState<journalcategory>({
        id: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch data from the API
    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch('/api/journals/category');
                const data = await response.json();
                setEntries(data);
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        };

        fetchEntries();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEntry((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (entry.id) {
            // Update existing entry
            await fetch(`/api/journals/category/${entry.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entry),
            });
            setEntries((prev) =>
                prev.map((item) => (item.id === entry.id ? entry : item))
            );
            import('sweetalert2').then((Swal) => {
                Swal.default.fire(
                'Updated!',
                'The category has been updated successfully.',
                'success'
                );
            });
            } else {
            // Create new entry
            const response = await fetch('/api/journals/category', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entry),
            });
            const newEntry = await response.json();
            setEntries((prev) => [newEntry, ...prev]);
            import('sweetalert2').then((Swal) => {
                Swal.default.fire(
                'Created!',
                'The category has been created successfully.',
                'success'
                );
            });
            }

            setEntry({
            id: '',
            category: '',
            date: new Date().toISOString().split('T')[0],
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving entry:', error);
            import('sweetalert2').then((Swal) => {
            Swal.default.fire(
                'Error!',
                'There was an error saving the category. Please try again.',
                'error'
            );
            });
        }
    };

    const handleEdit = (id: string) => {
        const entryToEdit = entries.find((item) => item.id === id);
        if (entryToEdit) {
            setEntry(entryToEdit);
            setIsModalOpen(true);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await fetch(`/api/journals/category/${id}`, {
                method: 'DELETE',
            });
            setEntries((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Journal Categories</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mb-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Add New Category
                </button>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4">{entry.id ? 'Edit Category' : 'New Category'}</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
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
                                        {entry.id ? 'Update Category' : 'Save Category'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <h2 className="text-2xl font-semibold mt-8 mb-4">Existing Categories</h2>
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {entries.map((item) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
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
                                                                'Your category has been deleted.',
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

export default JournalCategory;