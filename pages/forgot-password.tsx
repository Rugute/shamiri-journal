import React, { useState } from 'react';
import Link from 'next/link'; // Import Link from Next.js

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        // Add logic to handle password reset
        fetch('/api/auth/password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
        .then((response) => {
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error('Failed to send password reset link');
            }
            return response.json();
        })
        .then(() => {
            import('sweetalert2').then((Swal) => {
                Swal.default.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Password reset link sent successfully!',
                });
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            import('sweetalert2').then((Swal) => {
                Swal.default.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred. Please try again.',
                });
            });
        });

        console.log('Password reset link sent to:', email);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <img
                    alt="Your Company"
                    src="/logo.jpeg"
                    className="mx-auto h-36 w-auto"
                />
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Forgot Password</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Send Reset Link
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link href="/login"
                         className="text-blue-500 hover:underline">Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
