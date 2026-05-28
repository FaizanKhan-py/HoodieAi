
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './components/Home'
import Creatnow from './components/createnow'
import Designs from './components/designs'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-950 to-black text-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="designs" element={<Designs />} />
          <Route path="create" element={<Creatnow />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
