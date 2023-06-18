
import {Routes, Route,} from "react-router-dom"
import NotFound from './pages/NotFound'
import Landing from './pages/Landing'
import Home from './pages/Home'


function App() {

  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='*' element={<NotFound />} />
        <Route />
      </Routes>
    </div>
  )
}

export default App
