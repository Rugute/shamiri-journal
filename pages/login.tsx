// This page is used to display the login form and handle the login process
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('/api/auth/validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            router.push('/profile');
          } else {
            console.error('Invalid token');
          }
        } catch (error) {
          console.error('Error validating token:', error);
        }
      }
    };

    validateToken();
  }, [router]);

  const handleLoginSuccess = (): void => {
    router.push('/profile'); // Redirect to the profile page on successful login
  };

  return (
    <div>
  
      <LoginForm onLogin={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;