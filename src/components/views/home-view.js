import React from 'react';
import { Redirect } from 'react-router-dom';

export default function HomeView() {
  return (
    <Redirect
      to={{
        pathname: '/sketches/bobross',
        state: { from: '/' },
      }}
    />
  );
}
