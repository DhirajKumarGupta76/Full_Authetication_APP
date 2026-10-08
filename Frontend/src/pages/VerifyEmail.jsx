import React from "react";

const VerifyEmail = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#dcfce7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          maxWidth: "450px",
          padding: "40px 30px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "50px",
            marginBottom: "20px",
          }}
        >
          📧
        </div>

        <h2
          style={{
            fontSize: "28px",
            fontWeight: "600",
            color: "#15803d",
            marginBottom: "15px",
          }}
        >
          Check Your Email
        </h2>

        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.7",
            color: "#6b7280",
            margin: 0,
          }}
        >
          We've sent you an email to verify your account. Please check your
          inbox and click the verification link to complete your registration.
        </p>

        <button
          style={{
            marginTop: "25px",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#16a34a",
            color: "white",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;