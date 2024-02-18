

import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Protected from './components/Protected';

function App() {

  

  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path='/' element={<Protected Component={Home}/>} />
        <Route path='/login' element={<Login/>} />;
        
        <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
