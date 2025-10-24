import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import AccountModal from "./components/AccountModal";

import Home from './pages/Home';
import Challenge from "./pages/Challenge";
import Learning from "./pages/Learning";
import Community from "./pages/Community";
import Square from "./pages/Square";
import About from './pages/About';
import MyAccount from './pages/MyAccount';

import './App.scss';
import './styles/fonts.scss';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className="app">
      <Router>
        <Header className="header" openModal={() => setIsModalOpen(true)} />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/community" element={<Community />} />
            <Route path="/square/*" element={<Square />} />
            <Route path="/about" element={<About />} />
            <Route path="/my-account" element={<MyAccount />} />
          </Routes>

          <AccountModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
