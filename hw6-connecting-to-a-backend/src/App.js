import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageNull, PageHome, PageProduct, PageDetail, PageCart, PageCreate, PageLogin } from './pages';
import { Header, Menu, Footer } from './components';
import { db } from './firebase';

function App() {
  useEffect(() => {
    db.collection('anchors')
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.docs.map((doc) => doc.data()));
      });
  });
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
          <Route path='/create' element={<PageCreate />}></Route>
          <Route path='/login' element={<PageLogin />}></Route>
          <Route path='/null' element={<PageNull />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
