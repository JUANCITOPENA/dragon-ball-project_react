import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Characters from './pages/Characters';
import Planets from './pages/Planets';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/planets" element={<Planets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
