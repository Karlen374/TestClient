import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactsPage from 'src/components/pages/contactsPage';
import HomePage from 'src/components/pages/homePage';
import AppHeader from 'src/components/appHeader/appHeader';
import styles from './App.module.scss';

const App = () => {
  return (
    <Router>
      <div className={styles.App}>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
