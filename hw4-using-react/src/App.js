import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageNull, PageHome, PageProduct, PageDetail, PageCart } from './pages';
import { Header, Menu, Footer } from './components';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Menu />
        <Routes>
          <Route path='/' element={<PageHome />}></Route>
          <Route path='/shirts' element={<PageProduct />}></Route>
          <Route path='/shirt/:productId' element={<PageDetail />}></Route>
          <Route path='/cart' element={<PageCart />}></Route>
          <Route path='/null' element={<PageNull />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
