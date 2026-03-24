import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import Login from './pages/Login';
import DocsPage from './pages/DocsPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import ApiKeysPage from './pages/dashboard/ApiKeysPage';
import OnboardingPage from './pages/dashboard/OnboardingPage';
import PendingVerificationPage from './pages/dashboard/PendingVerificationPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import { getToken, getProfile } from './lib/api';
import type { MerchantProfile } from './types';

/* ------------------------------------------------------------------ */
/*  AuthGate — fetches profile and enforces flow:                     */
/*    no token          → /login                                      */
/*    no wallet         → /onboarding                                 */
/*    not kycVerified   → /pending-verification                       */
/*    kycVerified       → allow through                               */
/* ------------------------------------------------------------------ */
const ONBOARDING_PATH = '/onboarding';
const PENDING_PATH = '/pending-verification';
const DASHBOARD_PATH = '/dashboard';

const AuthGate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    getProfile()
      .then(({ merchant }) => {
        const isOnboarded = Boolean(merchant.wallet?.address);
        const isVerified = merchant.kycVerified;
        const currentPath = location.pathname;

        if (!isOnboarded && currentPath !== ONBOARDING_PATH) {
          navigate(ONBOARDING_PATH, { replace: true });
        } else if (isOnboarded && !isVerified && currentPath !== PENDING_PATH) {
          navigate(PENDING_PATH, { replace: true });
        } else if (isOnboarded && isVerified && (
          currentPath === ONBOARDING_PATH || currentPath === PENDING_PATH
        )) {
          navigate(DASHBOARD_PATH, { replace: true });
        }
      })
      .catch(() => {
        // Token invalid/expired — force logout
        navigate('/login', { replace: true });
      })
      .finally(() => setChecking(false));
  }, [location.pathname]); // re-check on every navigation

  if (checking) {
    return (
      <div className="min-h-screen bg-[#060e0e] flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-[rgb(88,196,186)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <Outlet />;
};

/* ------------------------------------------------------------------ */
/*  App                                                               */
/* ------------------------------------------------------------------ */
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/docs" element={<DocsPage />} />

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

        {/* Merchant-protected routes — enforces onboarding → pending → dashboard flow */}
        <Route element={<AuthGate />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/pending-verification" element={<PendingVerificationPage />} />

          {/* Dashboard (nested layout) — only reachable if kycVerified */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="api-keys" element={<ApiKeysPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;