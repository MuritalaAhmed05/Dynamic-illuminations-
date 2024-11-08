import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Service from './Service';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import Header from './components/header';
import Footer from './components/Footer';
import Training from './Training';
// import Footer from './components/footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/trainig" element={<Training />} />
      </Routes>
      <Footer/>
    </Router>
  </React.StrictMode>
);
