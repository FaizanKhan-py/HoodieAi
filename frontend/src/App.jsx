import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './components/Home'
import Creatnow from './components/createnow'
import Designs from './components/designs'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'
import { CartProvider } from './Context/CartState'   

function App() {
  return (
    <CartProvider>  
      <div className="min-h-screen bg-gradient-to-r from-purple-950 to-black text-white">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="designs" element={<Designs />} />
            <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <Creatnow />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </div>
    </CartProvider>  
  )
}

export default App