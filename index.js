import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Flow from './pages/Flow';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Flow />} />
         <Route path='/flow/:name' element={<Flow />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
