import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";

const Verify = () => {
  const { token } = useParams();

  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

useEffect(() => {
  const verifyEmail = async () => {
    try {
      console.log("Token:", token);

      const response = await fetch(
        "http://localhost:8000/user/verify",
        {
          method: "Post",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Status:", response.status);

      const data = await response.json();

      console.log("Backend response:", data);

      if (response.ok && data.success) {
        setStatus("Email Verified Successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setStatus(data.message || "Email verification failed.");
      }

    } catch (error) {
      console.error("VERIFY EMAIL ERROR:", error);

      setStatus("Something went wrong. Please try again.");
    }
  };

  verifyEmail();
}, [token, navigate]);

  const isSuccess = status === "Email Verified Successfully!";
  const isLoading = status === "Verifying...";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 overflow-hidden flex items-center justify-center px-4">

      {/* Background circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-2xl" />

      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-2xl" />

      {/* Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-center">

        {/* Icon */}
        <div
          className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
            isLoading
              ? "bg-blue-100"
              : isSuccess
              ? "bg-green-100"
              : "bg-red-100"
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          ) : isSuccess ? (
            <CheckCircle className="w-10 h-10 text-green-600" />
          ) : (
            <XCircle className="w-10 h-10 text-red-600" />
          )}
        </div>

        {/* Mail icon */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gray-100 rounded-full">
            <Mail className="w-6 h-6 text-gray-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Email Verification
        </h1>

        {/* Status */}
        <p
          className={`mt-4 text-base sm:text-lg font-medium ${
            isLoading
              ? "text-blue-600"
              : isSuccess
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {status}
        </p>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">
          {isLoading
            ? "Please wait while we verify your email address..."
            : isSuccess
            ? "Your email has been successfully verified. Redirecting you to login..."
            : "We could not verify your email address. The link may be invalid or expired."}
        </p>

        {/* Button */}
        {!isLoading && !isSuccess && (
          <button
            onClick={() => navigate("/login")}
            className="mt-7 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Back to Login
          </button>
        )}

        {/* Footer */}
        <p className="mt-7 text-xs text-gray-400">
          © 2026 Your Authentication App
        </p>
      </div>
    </div>
  );
};

export default Verify;