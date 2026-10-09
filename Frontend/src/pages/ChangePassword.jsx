
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

const API_URL = "http://localhost:8000";

export default function ChangePassword() {
  const { email: routeEmail } = useParams();
  const email = routeEmail ? decodeURIComponent(routeEmail) : "";

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password requirements
  const requirements = [
    {
      label: "8 characters minimum",
      valid: password.length >= 8,
    },
    {
      label: "Uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "Lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "Number",
      valid: /\d/.test(password),
    },
    {
      label: "Special character",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const allRulesValid = requirements.every((item) => item.valid);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!email) {
      toast.error("Email address is missing. Please restart password reset.");
      return;
    }

    if (!allRulesValid) {
      toast.error("Please meet all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // IMPORTANT: These field names match your backend controller.
      const res = await axios.post(
        `${API_URL}/user/change-password/${encodeURIComponent(email)}`,
        {
          newPassword: password,
          confirmPassword: confirmPassword,
        }
      );

      if (res.data?.success) {
        toast.success(
          res.data.message || "Password Changed Successfully"
        );

        setPassword("");
        setConfirmPassword("");

        navigate("/login", { replace: true });
      } else {
        toast.error(
          res.data?.message || "Unable to change password."
        );
      }
    } catch (error) {
      console.error(
        "Change password error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Password change failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-100 px-4 py-6">
      <section className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-emerald-900/10">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-700 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/15 p-2.5">
              <ShieldCheck size={25} />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Change Password
              </h1>
              <p className="mt-1 text-xs text-emerald-100">
                Secure your account with a new password
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-5 py-6 sm:px-7">
          <Link
            to="/login"
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 transition hover:text-emerald-900"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>

          <div className="mb-5 flex items-start gap-3">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
              <LockKeyhole size={23} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-slate-900">
                Set a New Password
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Enter and confirm your new password.
              </p>
            </div>
          </div>

          {/* Account email */}
          <div className="mb-5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
            <p className="text-xs text-slate-500">
              Account email
            </p>
            <p className="mt-1 break-all text-sm font-medium text-slate-800">
              {email || "Email unavailable"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New password */}
            <div>
              <label
                htmlFor="new-password"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                New Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-700"
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>

              {/* Requirements */}
              <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1.5">
                {requirements.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-1.5 text-xs ${
                      item.valid
                        ? "text-emerald-700"
                        : "text-slate-400"
                    }`}
                  >
                    <CheckCircle2
                      size={13}
                      className="shrink-0"
                    />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="confirm-password"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Confirm Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="confirm-password"
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Re-enter new password"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>

              {confirmPassword && (
                <p
                  className={`mt-1.5 text-xs ${
                    password === confirmPassword
                      ? "text-emerald-700"
                      : "text-red-500"
                  }`}
                >
                  {password === confirmPassword
                    ? "Passwords match"
                    : "Passwords do not match"}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-700/15 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={17}
                    className="animate-spin"
                  />
                  Updating Password...
                </>
              ) : (
                <>
                  <LockKeyhole size={17} />
                  Change Password
                </>
              )}
            </button>
          </form>

          <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck size={14} />
            Your security matters to us
          </div>
        </div>
      </section>
    </main>
  );
}


