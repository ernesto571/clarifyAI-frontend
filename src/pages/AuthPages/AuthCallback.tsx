import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { fetchProfile, error } = useAuthStore();

  useEffect(() => {
    fetchProfile()
      .then(() => navigate("/dashboard", { replace: true }))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  if (error) {
    return <p>Authentication failed. Redirecting...</p>;
  }

}