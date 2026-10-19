
import React, { useEffect } from "react";
import axios from "axios";
import { getData } from "@/Context/UserContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthSuccess = () => {
  const { setUser } = getData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleAuth = async () => {
      const accessToken = searchParams.get("token");

      console.log("Google access token:", accessToken);

      // If the token is missing, redirect to login.
      if (!accessToken) {
        navigate("/login?error=token_missing", {
          replace: true,
        });
        return;
      }

      // Save the token.
      localStorage.setItem("accessToken", accessToken);

      try {
        // Fetch the authenticated user's details.
        const res = await axios.get(
          `${ import.meta.env.VITE_BACKEND_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (res.data.success) {
          // Update the global user context.
          setUser(res.data.user);

          // Redirect to the home page.
          navigate("/", { replace: true });
        } else {
          localStorage.removeItem("accessToken");
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error(
          "Error fetching user:",
          error.response?.data || error.message
        );

        localStorage.removeItem("accessToken");
        navigate("/login?error=authentication_failed", {
          replace: true,
        });
      }
    };

    handleAuth();
  }, [searchParams, navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium">
        Completing Google login...
      </p>
    </div>
  );
};

export default AuthSuccess;

