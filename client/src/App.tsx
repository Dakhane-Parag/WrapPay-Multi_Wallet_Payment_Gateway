    import { BrowserRouter, Routes,Route } from 'react-router-dom';
    import Home from './pages/Home';
    import Navbar from './components/Navbar';
    import AuthPage from './pages/AuthPage';
    import Login from './pages/Login';

    const App = () => {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<AuthPage/>}/>
            <Route path="/login" element={<Login/>}/>
            


          </Routes>
        </BrowserRouter>
        
      )
    }

    export default App;