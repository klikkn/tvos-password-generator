'use client';

import React from 'react';
import { useEffect, useState } from 'react';

const Home = () => {
  const [password, setPassword] = useState('');

  const refreshPassword = () => {
    fetch('/api/password')
      .then(response => response.json())
      .then(data => {
        setPassword(data.password);
      })
      .catch(error => {
        console.error('There was an error fetching the password!', error);
      });
  }

  useEffect(() => {
    refreshPassword()
  }, []);

  return (
    <div>
      <p>Your generated password is: {password}</p>
      <button onClick={refreshPassword}>Refresh Password</button>
    </div>
  );
};

export default Home;