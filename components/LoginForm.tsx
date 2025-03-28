// Code for the login form component
import { useState } from 'react';

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.token) {
      // On successful login, store the token
      localStorage.setItem('token', data.token);
      onLogin();
    } else {
      setError(data.error || 'Login failed');
    }
  };

  return (
     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        alt="Your Company"
        src="/logo.jpeg"
        className="mx-auto h-36 w-auto"
      />
      <h2 className="mt-10 text-center text-3xl/9 font-bold tracking-tight text-gray-900">
        Personal Journaling App
      </h2>
     </div>

     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
       <form onSubmit={handleSubmit} className="space-y-6">
         <div>
           <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
             Username address
           </label>
           <div className="mt-2">
             <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
             />
           </div>
         </div>

         <div>
           <div className="flex items-center justify-between">
             <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
               Password
             </label>
             <div className="text-sm">
               <a href="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
               Forgot password?
               </a>
             </div>
           </div>
           <div className="mt-2">
             <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
               autoComplete="current-password"
               className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
             />
           </div>
         </div>
         <div className="mb-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
         </div>

         <div>
           <button
             type="submit"
             className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
           >
             Sign in
           </button>
         </div>
       </form>

       <p className="mt-10 text-center text-sm/6 text-gray-500">
         Not a member?{' '}
         <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Create Account Here
         </a>
       </p>
     </div>
   </div>
 
  );
};

export default LoginForm;
