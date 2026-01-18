    import { BrowserRouter, Routes,Route } from 'react-router-dom';
    import Home from './pages/Home';
    import Navbar from './components/Navbar';
    import AuthPage from './pages/AuthPage';

    const App = () => {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<AuthPage/>}/>


          </Routes>
        </BrowserRouter>
        
      )
    }

    export default App;