import React from 'react';
import { createRoot } from 'react-dom/client';
import { ClipboardDebugger } from './clipboard-debugger';
import { Footer } from './footer';

function App() {
  return (
    <div className="py-10">
      <ClipboardDebugger />
      <Footer />
    </div>
  );
}

const root = document.getElementById('react-root');
if (!root) {
  throw new Error('React root element not found');
}

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
