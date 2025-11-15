import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
         <Route path="/" element={<Home/>} />
         {/* <Route path="/signup" element={<Signup />} />
         <Route path="/signin" element={<Signin />} /> */}


      </Routes>
    </BrowserRouter>
    
  )
}

export default App;