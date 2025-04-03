import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@/app/providers/theme-provider';
import Router from './router/router';
import './styles/globals.css';
import { store } from './store/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
