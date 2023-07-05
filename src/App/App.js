import { Home, VerificationForm } from '../pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/verify" element={<VerificationForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
