
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import MapPage from './components/MapPage';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
          <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<MapPage />} />
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
