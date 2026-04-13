import { Plus, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/AuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const { loginWithGoogle, loginWithGithub, formData, setFormData, signup, isLoading, isGoogleLoading, isGithubLoading, error, user, clearError } = useAuthStore();
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
  }, [user]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.first_name?.trim()) return toast.error("First name is required.");
    if (!formData.last_name?.trim()) return toast.error("Last name is required.");
    if (!formData.email?.trim()) return toast.error("Email is required.");
    if (!formData.password) return toast.error("Password is required.");
    if (formData.password.length < 8) return toast.error("Password must be at least 8 characters.");
    if (!formData.role) return toast.error("Please select your role.");
    try {
      await signup(formData);
    } catch (err) {
      console.error("Error in handleSubmit", err);
    }
  };

  const inputClass = (value: string) =>
    `input border focus:outline-none focus:border-[#ffe034] focus:text-gray-800 transition-colors ${
      value ? "bg-white text-gray-800" : "bg-[#f3f3eb]"
    }`;

  const btn = "text-gray-900 flex justify-center font-semibold gap-2 py-2 border border-gray-200 hover:-translate-y-[2px] hover:border-black w-full rounded-lg transition ease-in-out transform text-[0.9rem]";

  return (
    <section className="font-satoshi">
      <div className="grid grid-cols-2 gap-5">
        <button type="button" onClick={loginWithGoogle} disabled={isGoogleLoading} className={btn}>
          <img src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1775685859/google-color-svgrepo-com_howgro.svg" alt="Google logo" className="w-[17px]" />
          {isGoogleLoading ? "Redirecting..." : "Google"}
        </button>
        <button type="button" onClick={loginWithGithub} disabled={isGithubLoading} className={btn}>
          <img src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1775685810/github-142-svgrepo-com_ahi8yu.svg" alt="Github logo" className="w-[17px]" />
          {isGithubLoading ? "Redirecting..." : "Github"}
        </button>
      </div>
      <span className="flex items-center my-5 text-[0.75rem] text-gray-400 font-semibold">
        <div className="flex-grow border-t border-gray-300"></div>
        <p className="px-3">OR CONTINUE WITH EMAIL</p>
        <div className="flex-grow border-t border-gray-300"></div>
      </span>
      <div className="grid grid-cols-2 gap-5">
        <span className="flex flex-col gap-2">
          <p className="label">FIRST NAME</p>
          <input type="text" name="first_name" onChange={handleChange} value={formData.first_name ?? ""} placeholder="Emmanuel" className={inputClass(formData.first_name ?? "")} />
        </span>
        <span className="flex flex-col gap-2">
          <p className="label">LAST NAME</p>
          <input type="text" name="last_name" onChange={handleChange} value={formData.last_name ?? ""} placeholder="Olise" className={inputClass(formData.last_name ?? "")} />
        </span>
      </div>
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
            placeholder="Min. 8 characters"
            className={`${inputClass(formData.password)} w-full pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        <p className="text-[0.7rem] text-gray-400">Use a mix of letters, numbers, and symbols.</p>
      </span>
      <span className="flex flex-col gap-2 pt-3">
        <p className="label">WHAT BEST DESCRIBES YOU?</p>
        <select name="role" onChange={handleChange} value={formData.role} required
          className="py-3 rounded-lg text-gray-900 text-sm font-medium px-5 focus:outline-none focus:border-[#ffe034] border focus:text-gray-800 transition-colors bg-[#f3f3eb]">
          <option disabled value="">Select your role...</option>
          <option value="Freelancer / Contractor">Freelancer / Contractor</option>
          <option value="Employee renewing a contract">Employee renewing a contract</option>
          <option value="Business Owner">Business Owner</option>
          <option value="Legal Professional">Legal Professional</option>
          <option value="Student">Student</option>
        </select>
      </span>
      <button type="button" onClick={handleSubmit} disabled={isLoading}
        className="text-primary font-cabinet font-bold flex gap-1 items-center py-3 justify-center bg-tet mt-4 hover:-translate-y-[2px] w-full rounded-xl tracking-wide disabled:cursor-not-allowed disabled:opacity-50">
        <Plus className="size-4" />
        {isLoading ? "Creating Account..." : "Create Free Account"}
      </button>
    </section>
  );
}