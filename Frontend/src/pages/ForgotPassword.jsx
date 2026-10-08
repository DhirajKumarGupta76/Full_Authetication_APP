
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  ShieldCheck,
  LockKeyhole,
  CheckCircle2,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import { getData } from "@/Context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
 
  const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!email.trim()) {
    setError("Please enter your email address.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    setError("Please enter a valid email address.");
    return;
  }

  setIsLoading(true);

  try {
    const res = await axios.post(
      "http://localhost:8000/user/forgot-password",
      {
        email: email.trim(),
      }
    );

    if (res.data.success) {
      toast.success(res.data.message || "OTP sent successfully!");

      const encodedEmail = encodeURIComponent(email.trim());
      setEmail("");

      navigate(`/verify-otp/${encodedEmail}`);
    } else {
      setError(res.data.message || "Failed to send OTP. Please try again.");
    }

} catch (err) {
  console.error("Forgot Password Error:", err);

  console.log("Error message:", err.message);
  console.log("Response data:", err.response?.data);
  console.log("HTTP status:", err.response?.status);

  setError(
    err.response?.data?.message ||
    err.message ||
    "Unable to process your request. Please try again."
  );
} finally {
  setIsLoading(false);
}
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/40 to-teal-50 p-3 sm:p-5 lg:p-6">
      {/* Main Card: fixed desktop height */}
      <div className="mx-auto grid min-h-[620px] w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70 lg:h-[700px] lg:min-h-0 lg:grid-cols-2">

        {/* LEFT PANEL */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-8 text-white lg:flex lg:flex-col lg:justify-between xl:p-10">
          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

          {/* Brand */}
          <Link
            to="/"
            className="relative z-10 flex w-fit items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
              <ShieldCheck size={25} />
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight">
                SecureSpace
              </h2>
              <p className="text-xs text-emerald-100/80">
                Your account, protected.
              </p>
            </div>
          </Link>

          {/* Compact illustration and text */}
          <div className="relative z-10">
            <div className="relative mx-auto flex aspect-square w-full max-w-[270px] items-center justify-center">
              <div className="absolute inset-5 rounded-full border border-white/10" />
              <div className="absolute inset-12 rounded-full border border-white/15" />

              <div className="relative flex h-36 w-36 items-center justify-center rounded-[32px] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
                <div className="flex h-24 w-24 items-center justify-center rounded-[26px] bg-gradient-to-br from-emerald-300 to-teal-400 text-emerald-950">
                  <LockKeyhole size={48} strokeWidth={1.6} />
                </div>

                <div className="absolute -right-5 top-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-xl">
                  <Mail size={22} />
                </div>

                <div className="absolute -bottom-4 -left-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-xl">
                  <ShieldCheck size={23} />
                </div>
              </div>

              <div className="absolute right-0 top-6 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs backdrop-blur-md">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-300" />
                Secure recovery
              </div>
            </div>

            <div className="mt-3 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-emerald-100">
                <Sparkles size={13} />
                SIMPLE. SAFE. SECURE.
              </div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight xl:text-4xl">
                A fresh start
                <br />
                <span className="text-emerald-300">
                  begins here.
                </span>
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-emerald-50/75">
                Regain access to your account with a simple and secure
                password recovery process.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex items-center justify-between gap-3 border-t border-white/15 pt-4 text-[11px] text-emerald-100/70">
            <span>© {new Date().getFullYear()} SecureSpace</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} />
              Secure account recovery
            </span>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="flex min-w-0 items-center justify-center px-5 py-8 sm:px-10 lg:px-10 xl:px-14">
          <div className="w-full max-w-md">
            {/* Mobile brand */}
            <Link
              to="/"
              className="mb-8 flex w-fit items-center gap-3 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white">
                <ShieldCheck size={23} />
              </div>
              <span className="text-lg font-bold text-slate-900">
                SecureSpace
              </span>
            </Link>

            {/* Back link */}
            <Link
              to="/login"
              className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-700"
            >
              <ArrowLeft size={16} />
              Back to sign in
            </Link>

            {isSubmitted ? (
              /* SUCCESS STATE */
              <div>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <CheckCircle2 size={30} />
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Check your inbox
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  If the request was processed, password reset
                  instructions will be sent to the email address you
                  provided.
                </p>

                <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                  <Mail size={20} className="shrink-0 text-emerald-700" />
                  <span className="break-all text-sm font-medium text-slate-700">
                    {email}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setError("");
                  }}
                  className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  Try another email
                </button>

                <p className="mt-6 text-center text-sm text-slate-500">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-emerald-700 hover:text-emerald-900"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            ) : (
              /* FORGOT PASSWORD FORM */
              <>
                <div className="mb-6">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                    <LockKeyhole size={27} />
                  </div>

                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.17em] text-emerald-700">
                    Account recovery
                  </p>

                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Forgot your password?
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    No worries! Enter your registered email address and
                    we'll help you reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <div
                    className={`group flex items-center gap-3 rounded-xl border bg-white px-4 transition-all duration-200 focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-600/10 ${
                      error
                        ? "border-red-400"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Mail
                      size={19}
                      className="shrink-0 text-slate-400 transition group-focus-within:text-emerald-700"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      disabled={isLoading}
                      aria-invalid={!!error}
                      aria-describedby={error ? "email-error" : undefined}
                      className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>

                  {error && (
                    <p
                      id="email-error"
                      role="alert"
                      className="mt-2 text-sm text-red-600"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-600/20 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <LoaderCircle
                          size={18}
                          className="animate-spin"
                        />
                        Sending request...
                      </>
                    ) : (
                      <>
                        Send reset instructions
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>

                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Need help?
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <p className="text-center text-sm leading-6 text-slate-500">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-emerald-700 transition hover:text-emerald-900"
                  >
                    Sign in to your account
                  </Link>
                </p>

                <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={15} />
                  Your information stays protected.
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ForgotPassword;