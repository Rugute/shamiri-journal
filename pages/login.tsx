// This page is used to display the login form and handle the login process
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Validate the token with an API call or decode it to ensure it's valid
      router.push('/profile');
    }
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