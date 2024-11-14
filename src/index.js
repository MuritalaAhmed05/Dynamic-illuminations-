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
import Faq from './Faq';
// import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <Header/>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/training" element={<Training />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
      <Footer/>
    </Router>
  </React.StrictMode>
);
