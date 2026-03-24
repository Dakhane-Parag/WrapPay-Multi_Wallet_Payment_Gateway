    import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
    import Home from './pages/Home';
    import Navbar from './components/Navbar';
    import AuthPage from './pages/AuthPage';
    import Login from './pages/Login';
    import DocsPage from './pages/DocsPage';
    import DashboardLayout from './components/DashboardLayout';
    import DashboardPage from './pages/dashboard/DashboardPage';
    import ApiKeysPage from './pages/dashboard/ApiKeysPage';
    import OnboardingPage from './pages/dashboard/OnboardingPage';
    import PendingVerificationPage from './pages/dashboard/PendingVerificationPage';
    import { getToken } from './lib/api';

    /* Simple auth guard — redirects to /login if no JWT token */
    const RequireAuth = () => {
      const token = getToken();
      if (!token) return <Navigate to="/login" replace />;
      return <Outlet />;
    };

    const App = () => {
      return (
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<AuthPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/docs" element={<DocsPage/>}/>

            {/* Auth-protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/pending-verification" element={<PendingVerificationPage />} />

              {/* Dashboard (nested layout) */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="api-keys" element={<ApiKeysPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      )
    }

    export default App;