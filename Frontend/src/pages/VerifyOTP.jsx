import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
  Mail,
  CheckCircle2,
  LoaderCircle,
  RefreshCw,
  Zap,
} from "lucide-react";

const API_URL = "http://localhost:8000";

const VerifyOtp = () => {
  const { email: routeEmail } = useParams();
  const email = routeEmail ? decodeURIComponent(routeEmail) : "";

  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(45);
  const [successMessage, setSuccessMessage] = useState("");

  // Resend OTP countdown
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    setError("");

    setOtp((prev) => {
      const updated = [...prev];
      updated[index] = digit;
      return updated;
    });

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedOtp = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedOtp) return;

    const digits = Array.from({ length: 6 }, (_, i) => pastedOtp[i] || "");

    setOtp(digits);
    setError("");

    inputRefs.current[Math.min(pastedOtp.length, 5)]?.focus();
  };

const handleVerify = async (e) => {
  e.preventDefault();
  setError("");
  setSuccessMessage("");

  const otpValue = otp.join("");

  // Validate OTP
  if (otpValue.length !== 6) {
    setError("Please enter all 6 digits of your OTP.");

    const firstEmptyIndex = otp.findIndex((digit) => !digit);
    inputRefs.current[
      firstEmptyIndex === -1 ? 0 : firstEmptyIndex
    ]?.focus();

    return;
  }

  setIsLoading(true);

  try {
 
const res = await axios.post(
  `${API_URL}/user/verify-otp/${encodeURIComponent(email)}`,
  {
    otp: otpValue,
  }
);

    if (res.data.success) {
      const message =
        res.data.message || "OTP verified successfully!";

      setSuccessMessage(message);
      toast.success(message);

      setTimeout(() => {
        navigate(
          `/reset-password/${encodeURIComponent(email)}`
        );
      }, 1500);
    } else {
      setError(
        res.data.message || "Invalid or expired OTP."
      );
    }
  
} catch (err) {
  console.error("OTP verification failed:", {
    status: err.response?.status,
    data: err.response?.data,
    url: err.config?.url,
    requestData: err.config?.data,
  });

  setError(
    err.response?.data?.message ||
    err.response?.data?.error ||
    "OTP verification failed. Please check the OTP and try again."
  );
} finally {
  setIsLoading(false);
}
};

  const handleResendOtp = async () => {
    if (countdown > 0 || isResending) return;

    setError("");
    setIsResending(true);

    try {
      // Uses the same forgot-password endpoint to request a new OTP.
      const res = await axios.post(`${API_URL}/user/forgot-password`, {
        email,
      });

      if (res.data.success) {
        setOtp(["", "", "", "", "", ""]);
        setCountdown(45);
        inputRefs.current[0]?.focus();

        toast.success(res.data.message || "A new OTP has been sent.");
      } else {
        setError(res.data.message || "Unable to resend OTP.");
      }
    } catch (err) {
      console.error("Resend OTP error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to resend OTP. Please try again.",
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-emerald-50 to-teal-100 p-3 sm:p-5 lg:p-8">
      <div className="mx-auto grid min-h-[600px] w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-emerald-950/10 lg:h-[700px] lg:min-h-0 lg:grid-cols-2">
        {/* LEFT PANEL */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-8 text-white lg:flex lg:flex-col lg:justify-between xl:p-10">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -bottom-36 -left-28 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />

          {/* Brand */}
          <Link to="/" className="relative z-10 flex w-fit items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <ShieldCheck size={28} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight">SecureSpace</h2>
              <p className="text-xs text-emerald-100/80">
                Your account, protected.
              </p>
            </div>
          </Link>

          {/* Illustration */}
          <div className="relative z-10">
            <div className="relative mx-auto flex aspect-square w-full max-w-[300px] items-center justify-center">
              <div className="absolute inset-5 rounded-full border border-white/10" />
              <div className="absolute inset-12 rounded-full border border-white/15" />
              <div className="absolute inset-20 rounded-full bg-white/[0.04]" />

              <div className="relative flex h-40 w-40 items-center justify-center rounded-[36px] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
                <div className="flex h-28 w-28 items-center justify-center rounded-[28px] bg-gradient-to-br from-emerald-300 to-teal-400 text-emerald-950 shadow-lg">
                  <LockKeyhole size={54} strokeWidth={1.5} />
                </div>

                <div className="absolute -right-5 top-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur-xl">
                  <Mail size={23} />
                </div>

                <div className="absolute -bottom-4 -left-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur-xl">
                  <CheckCircle2 size={25} />
                </div>
              </div>

              <div className="absolute right-0 top-8 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs backdrop-blur-md">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-300" />
                Identity protected
              </div>
            </div>

            <div className="mt-5 text-center">
              <p className="mb-3 text-xs font-bold tracking-[0.2em] text-emerald-300">
                ONE LAST STEP
              </p>

              <h1 className="text-3xl font-bold tracking-tight xl:text-4xl">
                Verify your
                <span className="text-emerald-300"> identity.</span>
              </h1>

              <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-emerald-50/80">
                Enter the verification code sent to your email to continue
                securely and get back to your account.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="relative z-10 grid grid-cols-3 divide-x divide-white/20 border-t border-white/15 pt-5">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck size={20} className="text-emerald-300" />
              <span className="text-xs font-medium">Secure</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Zap size={20} className="text-emerald-300" />
              <span className="text-xs font-medium">Fast</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <LockKeyhole size={20} className="text-emerald-300" />
              <span className="text-xs font-medium">Reliable</span>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="flex min-w-0 items-center justify-center px-5 py-8 sm:px-10 lg:px-10 xl:px-14">
          <div className="w-full max-w-md">
            {/* Mobile branding */}
            <Link
              to="/"
              className="mb-8 flex w-fit items-center gap-3 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white">
                <ShieldCheck size={24} />
              </div>
              <span className="text-lg font-bold text-slate-900">
                SecureSpace
              </span>
            </Link>

            <Link
              to="/forgot-password"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-700"
            >
              <ArrowLeft size={17} />
              Back to forgot password
            </Link>

            <div className="mb-7">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                <ShieldCheck size={30} />
              </div>

              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                Email verification
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Verify OTP
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                We've sent a 6-digit verification code to
              </p>

              <div className="mt-1 flex items-start gap-2 break-all font-semibold text-emerald-700">
                <Mail size={18} className="mt-1 shrink-0" />
                <span>{email || "Email address unavailable"}</span>
              </div>
            </div>

            <form onSubmit={handleVerify} noValidate>
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Enter verification code
              </label>

              <div
                className="grid grid-cols-6 gap-2 sm:gap-3"
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    pattern="[0-9]*"
                    maxLength={1}
                    aria-label={`OTP digit ${index + 1}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={isLoading}
                    className={`h-12 min-w-0 rounded-xl border text-center text-xl font-bold text-slate-900 outline-none transition-all sm:h-14 sm:text-2xl ${
                      digit
                        ? "border-emerald-500 bg-emerald-50/50"
                        : "border-slate-200 bg-white"
                    } focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:opacity-60`}
                  />
                ))}
              </div>

              <p className="mt-3 text-xs text-slate-400">
                Enter the 6-digit code sent to your email.
              </p>

              {error && (
                <div
                  role="alert"
                  className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !email}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-600/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <LoaderCircle size={19} className="animate-spin" />
                    Verifying code...
                  </>
                ) : (
                  <>
                    Verify OTP
                    <ArrowRight size={19} />
                  </>
                )}
              </button>
            </form>

            {/* Resend OTP */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">Didn't receive the code?</p>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={countdown > 0 || isResending}
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900 disabled:cursor-not-allowed disabled:text-slate-400"
              >
                {isResending ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  <RefreshCw size={15} />
                )}

                {countdown > 0
                  ? `Resend OTP in 00:${String(countdown).padStart(2, "0")}`
                  : isResending
                    ? "Sending OTP..."
                    : "Resend OTP"}
              </button>
            </div>

            {/* Help panel */}
            <div className="mt-7 flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Mail size={21} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Check your inbox
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  If you can't find the OTP, check your spam or junk folder.
                  Never share your verification code.
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              <ShieldCheck size={14} className="mr-1 inline-block" />
              Your account security matters.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VerifyOtp;
