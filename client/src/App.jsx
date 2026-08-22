import { Routes, Route, useLocation, Outlet } from "react-router-dom";

import { ToastProvider } from "./context/ToastContext.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";

import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Work from "./pages/Work.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AdminProjects from "./pages/admin/Projects.jsx";
import AdminServices from "./pages/admin/Services.jsx";
import AdminTestimonials from "./pages/admin/Testimonials.jsx";
import AdminMessages from "./pages/admin/Messages.jsx";
import AdminSettings from "./pages/admin/Settings.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AdminGate() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return <AdminLayout />;
}

export default function App() {
  const location = useLocation();

  return (
    <SettingsProvider>
      <ToastProvider>
        <AuthProvider>
          <ScrollToTop />
          <Routes location={location}>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/admin" element={<AdminGate />}>
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </SettingsProvider>
  );
}