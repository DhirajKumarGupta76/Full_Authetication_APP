
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  Mail,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

const API_URL = "http://localhost:8000";

export default function VerifyOTP() {
  const { email: routeEmail } = useParams();
  const email = routeEmail ? decodeURIComponent(routeEmail) : "";

  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    setOtp((previous) => {
      const updated = [...previous];
      updated[index] = digit;
      return updated;
    });

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedDigits) return;

    const updated = ["", "", "", "", "", ""];

    pastedDigits.split("").forEach((digit, index) => {
      updated[index] = digit;
    });

    setOtp(updated);

    inputRefs.current[Math.min(pastedDigits.length, 5)]?.focus();
  };

  const handleVerifyOTP = async (event) => {
    event.preventDefault();

    const otpValue = otp.join("");

    if (!email) {
      toast.error("Email address is missing. Please restart password recovery.");
      return;
    }

    if (otpValue.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      // The backend expects the email in the URL and OTP in the body.
      const res = await axios.post(
        `${API_URL}/user/verify-otp/${encodeURIComponent(email)}`,
        { otp: otpValue }
      );

      if (res.data?.success) {
        toast.success(
          res.data.message || "OTP verified successfully!"
        );

        // Navigate only after successful OTP verification.
        navigate(
          `/change-password/${encodeURIComponent(email)}`,
          { replace: true }
        );
      } else {
        toast.error(res.data?.message || "OTP verification failed.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid OTP or verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      toast.error("Email address is missing.");
      return;
    }

    try {
      setResending(true);

      // Matches your forgot-password controller.
      const res = await axios.post(`${API_URL}/user/forgot-password`, {
        email,
      });

      if (res.data?.success) {
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();

        toast.success(res.data.message || "A new OTP has been sent.");
      } else {
        toast.error(res.data?.message || "Unable to resend OTP.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to resend OTP. Please try again."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-100 px-4 py-8">
      <section className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-emerald-900/10">

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-700 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/15 p-2.5">
              <ShieldCheck size={27} />
            </div>

            <div>
              <h1 className="text-xl font-bold">Verify Your Email</h1>
              <p className="mt-1 text-xs text-emerald-100">
                One more step to reset your password
              </p>
            </div>
          </div>
        </div>

        {/* OTP form */}
        <div className="px-5 py-7 sm:px-7">
          <Link
            to="/login"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-900"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <Mail size={27} />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Enter Verification Code
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Enter the 6-digit code sent to your email address.
          </p>

          <div className="mt-5 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-3">
            <p className="break-all text-sm font-medium text-emerald-900">
              {email || "Email address unavailable"}
            </p>
          </div>

          <form onSubmit={handleVerifyOTP} className="mt-6">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Verification Code
            </label>

            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  aria-label={`OTP digit ${index + 1}`}
                  maxLength={1}
                  value={digit}
                  onChange={(event) =>
                    handleOtpChange(index, event.target.value)
                  }
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  required
                  className="h-12 min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 text-center text-xl font-bold text-emerald-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 sm:h-14"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || otp.join("").length !== 6}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Verifying OTP...
                </>
              ) : (
                <>
                  Verify OTP
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <p className="text-sm text-slate-500">
              Didn't receive the code?
            </p>

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resending || loading}
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900 disabled:opacity-60"
            >
              {resending ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <RefreshCw size={16} />
              )}
              {resending ? "Sending OTP..." : "Resend OTP"}
            </button>
          </div>

          <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck size={14} />
            Your verification is secure
          </div>
        </div>
      </section>
    </main>
  );
}


