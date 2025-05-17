import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import Footer from './Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import OrderOnlinePage from './pages/OrderOnlinePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/order-online" element={<OrderOnlinePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
