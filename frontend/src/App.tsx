import { FC } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from './components/Signin';
import { Signup } from './components/Signup';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Products } from './components/Products';
import { MyOrders } from './components/MyOrders';
import { Cart } from './components/Cart';

export const App: FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<Products/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/my-orders" element={<MyOrders/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}