import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/AuthStore";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { loginWithGoogle, loginWithGithub, formData, setFormData, login, isLoading, isGoogleLoading, isGithubLoading, error, user, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error]);
  
  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.email?.trim()) return toast.error("Email is required.");
    if (!formData.password) return toast.error("Password is required.");
    if (formData.password.length < 8) return toast.error("Password must be at least 8 characters.");
    try {
      await login(formData);
    } catch (err) {
      console.error("Error in handleSubmit", err);
    }
  };

  const inputClass = (value: string) =>
    `input border focus:outline-none focus:border-[#ffe034] focus:text-gray-800 transition-colors ${
      value ? "bg-white text-gray-800" : "bg-[#f3f3eb]"
    }`;

  return (
    <section className="bg-tet-2 h-screen flex items-center justify-center">
      <div className="flex w-[85%] md:w-[50%] lg:w-[32%] bg-white py-10 my-auto mx-auto items-center justify-center rounded-2xl shadow-lg">
        <section className="flex flex-col items-center justify-center w-full px-8">
          <img src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1775521808/clarifyai_logo_drekht.png" alt="logo" className="w-[8rem]" />
          <h1 className="font-cabinet tracking-tight text-[1.7rem] pt-3 text-gray-800 font-semibold">Welcome back</h1>
          <p className="font-satoshi text-sm text-gray-500 font-semibold pt-1 text-center">Log in to access your documents and analyses history</p>
          <section className="font-satoshi w-full mx-auto mt-5">
            <div className="flex gap-5 w-full">
              <button type="button" onClick={loginWithGoogle} disabled={isGoogleLoading} className="oauth w-full hover:-translate-y-[2px] hover:border-black transition ease-in-out transform">
                <img src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1775685859/google-color-svgrepo-com_howgro.svg" alt="Google logo" className="w-[17px]" />
                {isGoogleLoading ? "Redirecting..." : "Google"}
              </button>
              <button type="button" onClick={loginWithGithub} disabled={isGithubLoading} className="oauth w-full hover:-translate-y-[2px] hover:border-black transition ease-in-out transform">
                <img src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1775685810/github-142-svgrepo-com_ahi8yu.svg" alt="Github logo" className="w-[17px]" />
                {isGithubLoading ? "Redirecting..." : "Github"}
              </button>
            </div>
            <span className="flex items-center my-5 text-[0.75rem] text-gray-400 font-semibold">
              <div className="flex-grow border-t border-gray-300"></div>
              <p className="px-3">OR WITH EMAIL</p>
              <div className="flex-grow border-t border-gray-300"></div>
            </span>
            <span className="flex flex-col gap-2 pt-3">
              <p className="label">EMAIL ADDRESS</p>
              <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="you@example.com" className={inputClass(formData.email)} />
            </span>
            <span className="flex flex-col gap-2 pt-3">
              <p className="label">PASSWORD</p>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  minLength={8}
                  placeholder="password"
                  className={`${inputClass(formData.password)} w-full pr-10`}
                />
                <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </span>
            <button type="button" onClick={handleSubmit} disabled={isLoading} className="text-primary font-cabinet font-bold flex gap-1 items-center py-3 justify-center bg-tet mt-5 hover:-translate-y-[2px] w-full rounded-xl tracking-wide disabled:cursor-not-allowed disabled:opacity-50">
              <ArrowRight className="size-4" />
              {isLoading ? "Logging in..." : "Log In"}
            </button>
            <span className="flex justify-center gap-2 text-gray-500 text-[0.9rem] mt-5">
              <p>Don't have an account?</p>
              <Link to="/signup" className="text-primary font-semibold hover:underline">Sign up free</Link>
            </span>
          </section>
        </section>
      </div>
    </section>
  );
}