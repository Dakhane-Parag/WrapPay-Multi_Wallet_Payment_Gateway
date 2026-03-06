    import { BrowserRouter, Routes,Route } from 'react-router-dom';
    import Home from './pages/Home';
    import Navbar from './components/Navbar';
    import AuthPage from './pages/AuthPage';
    import Login from './pages/Login';
    import DocsPage from './pages/DocsPage';

    const App = () => {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<AuthPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/docs" element={<DocsPage/>}/>


          </Routes>
        </BrowserRouter>
        
      )
    }

    export default App;