import { Button } from '@mui/material';
import './App.scss';
import { Home } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/verify" element={<Home />} />
          <Route exact path="/register" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
