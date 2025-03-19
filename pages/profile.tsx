// Code for the Profile page ProtectedRoute component 
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      const response = await fetch('/api/auth/protected', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.message) {
        setProfileData(data.message);
      } else {
        router.push('/login');
      }

      setLoading(false);
    };

    fetchData();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div>
      <h1>Your Profile</h1>
      <p>{profileData}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
