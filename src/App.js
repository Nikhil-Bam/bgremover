import './App.css';
import Login from './component/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import BackgroundRemovalPage from './component/BackGroundRemovalPage';
import MagicBrushPage from './component/MagicBrushPage';
import CustomBackgroundPage from './component/CustomBackGroundPage';

function App() {
  return (
    <div className="backgroundma">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/backgroundremover' element={<BackgroundRemovalPage />} />
          <Route path="/custom-background" element={<CustomBackgroundPage />} />
          <Route path='/Blur-Background' element={<MagicBrushPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
