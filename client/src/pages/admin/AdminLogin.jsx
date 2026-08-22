import { useState } from "react";
import { Lock } from "lucide-react";

import SEO from "../../components/SEO.jsx";
import Button from "../../components/ui/Button.jsx";
import { Input } from "../../components/ui/Form.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";

export default function AdminLogin() {
  const { login } = useAuth();
  const toast = useToast();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = "Please provide a valid email";
    if (values.password.length < 6) nextErrors.password = "Password must be at least 6 characters";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    try {
      await login(values.email, values.password);
      toast.success("Welcome back!");
    } catch (err) {
      toast.error(err.message || "Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Admin Login" description="Sign in to the Koru admin dashboard." path="/admin" />
      <div className="flex min-h-screen items-center justify-center bg-ink px-5">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <p className="text-2xl font-extrabold tracking-tight text-white">KORU</p>
            <p className="mt-1 text-sm text-zinc-500">Admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Lock size={18} />
              </span>
              <div>
                <h1 className="font-bold text-white">Sign in</h1>
                <p className="text-xs text-zinc-500">Authorized personnel only</p>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                id="email"
                type="email"
                label="Email"
                name="email"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                error={errors.email}
                autoComplete="email"
                autoFocus
              />
              <Input
                id="password"
                type="password"
                label="Password"
                name="password"
                value={values.password}
                onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
                error={errors.password}
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" className="mt-6 w-full" size="lg" loading={loading}>
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}