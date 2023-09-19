import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  HashRouter,
} from 'react-router-dom';
import Landing from './Admin/Landing.jsx';
import Home from './Admin/Home.jsx';
import '../styles.css';
import TakeTally from './poll/TakeTally.jsx';
import TallyCreate from './Admin/TallyCreate.jsx';
import '../styles.css';

const App = () => {
  return (
    <div className='big-container'>
      <div className='app-container'>
        <h1>Tally.io</h1>
        <hr />
        <HashRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/home' element={<Home />} />
            <Route path='/create' element={<TallyCreate />} />
            <Route path='/survey/get/:questionId' element={<TakeTally />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
};

export default App;
