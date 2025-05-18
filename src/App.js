import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Main />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
