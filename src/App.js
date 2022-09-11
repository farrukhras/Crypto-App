import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import CoinDetails from './components/CoinDetails';
import Slider from './components/Slider';
import Header from './components/Header';
import { Outlet  } from "react-router-dom";

function App() {
  return (
    <>
      <Slider />
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
      </BrowserRouter>
      <Outlet />
    </>
  );
}

export default App;
