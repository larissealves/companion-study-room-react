import { Routes, Route } from 'react-router-dom';
import App from './App';
import Creditos from '../src/componentss/Creditos';

import React from 'react';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/creditos" element={<Creditos />} />
    </Routes>
  );
}
