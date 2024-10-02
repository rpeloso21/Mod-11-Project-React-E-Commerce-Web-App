import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import CustomerList from './Components/CustomerList';
import CustomerFormWrapper from './Components/CustomerFormWrapper';

import OrderList from './Components/OrdersList';
import ProductList from './Components/ProductsList';
import ProductFormWrapper from './Components/ProductFormWrapper';
import OrderFormWrapper from './Components/OrderFormWrapper';

import NotFound from './Components/NotFound';
import NavigationBar from './Components/NavigationBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';


function App() {

  return (
    <div>
      <Container className="bg-light p-4 shadow-sm rounded my-4 text-dark">
        <NavigationBar/>

        <Routes>

          <Route path='/' element={<Home/>}></Route>
          <Route path='/customers/' element={<CustomerList/>}></Route>
          <Route path='/add-customer' element={<CustomerFormWrapper/>}></Route>
          <Route path='/edit-customer/:id' element={<CustomerFormWrapper/>}></Route>

          <Route path='/products/' element={<ProductList/>}></Route>
          <Route path='/add-product/' element={<ProductFormWrapper/>}></Route>
          <Route path='/edit-product/:id/' element={<ProductFormWrapper/>}></Route>

          <Route path='/orders/' element={<OrderList/>}></Route>
          <Route path='/add-order/' element={<OrderFormWrapper/>}></Route>
          <Route path='/edit-order/:id' element={<OrderFormWrapper/>}></Route>

          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </Container>
    </div>
  )
}

export default App
