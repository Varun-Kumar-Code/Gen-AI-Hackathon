import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ArtisanProfile from './components/ArtisanProfile'; // ✅ Corrected import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/artisanprofile" element={<ArtisanProfile />} /> {/* ✅ Corrected element */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
