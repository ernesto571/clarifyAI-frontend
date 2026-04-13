import { Routes, Route, Navigate} from "react-router-dom";
import { Loader } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/LandingPage/Navbar";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/AuthPages/LoginPage";
import AuthCallback from "./pages/AuthPages/AuthCallback";
import AuthListener from "./hooks/AuthListener";
import Dashboard from "./pages/DashboardPages/Dashboard";
import { useAuthStore } from "./store/AuthStore";
import Topbar from "./components/Dashboard/Topbar";
import type React from "react";
import History from "./pages/DashboardPages/History";
import SavedDocs from "./pages/DashboardPages/SavedDocs";
import ProfilePage from "./pages/DashboardPages/ProfilePage";

interface RouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return null;
  if (!user) {
      toast.error("Sign in to view this page.");
      return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};


function App() {
  const { isLoading, user } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="size-10 animate-spin textprimary[#9D174D]" />
      </div>
    );
  }

  return (
    <>
      <AuthListener />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <><Navbar /><LandingPage /></>} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <><Navbar /><SignUpPage /></>} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={<><Topbar /><Dashboard /></>} />
        <Route path="/dashboard/history" element={<ProtectedRoute><Topbar /><History /></ProtectedRoute>} />
        <Route path="/dashboard/my-documents" element={<ProtectedRoute><Topbar /><SavedDocs /></ProtectedRoute>} />
        <Route path="/dashboard/profile" element={<ProtectedRoute><Topbar /><ProfilePage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: { background: "#1f2937", color: "#fff", borderRadius: "10px" },
        }}
      />
    </>
  );
}

export default App;