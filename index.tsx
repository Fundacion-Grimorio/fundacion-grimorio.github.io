
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Toaster } from 'react-hot-toast';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
    <Toaster 
      position="top-right"
      toastOptions={{
        className: 'font-sans rounded-md text-sm', // Use Inter (body font)
        style: {
          background: 'var(--tech-bg-light)', 
          color: 'var(--tech-text-primary)', 
          border: '1px solid var(--tech-border-color)', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        success: {
          iconTheme: {
            primary: 'var(--tech-success)', 
            secondary: 'var(--tech-text-primary)', 
          },
           style: {
            borderColor: 'var(--tech-success)',
          }
        },
        error: {
          iconTheme: {
            primary: 'var(--tech-error)', 
            secondary: 'var(--tech-text-primary)',
          },
          style: {
            borderColor: 'var(--tech-error)',
          }
        },
      }}
    />
  </React.StrictMode>
);
