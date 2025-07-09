import Main from './components/Main/Main';
import Settings from './components/Settings/Settings';
import { HashRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
      <nav className='links'>
        <NavLink to="/" className={
          ({ isActive }) => isActive ? 
          "link link-active" : 
          "link"
        }>Главная</NavLink>
        <NavLink to="/settings" className={
          ({ isActive }) => isActive ? 
          "link link-active" : 
          "link"
        }>Материалы</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  )
}

export default App
