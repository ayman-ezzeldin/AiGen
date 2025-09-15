import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail } from "lucide-react";

const AuthLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isVerified, verificationError } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      ).unwrap(); // unwrap() throws error if thunk fails

      if (result) {
        navigate("/user/home");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-2xl shadow-lg md:w-[636px] max-w-lg bg-white">
        <div className="flex flex-col items-center justify-center gap-2 ">
          <h2 className="text-3xl font-bold text-center text-zinc-800 ">
            Welcome Back!
          </h2>
          <p className="text-sm text-center text-[#52525B]">
            Sign in to continue designing and refining your models.
          </p>
        </div>
        {isAuthenticated && isVerified && (
          <p className="text-green-500 text-center mb-4">
            Logged in successfully
          </p>
        )}
        {verificationError && (
          <p className="text-red-500 text-center mb-4">{verificationError}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5 my-8">
          <div className="p-3 border border-[#12121214] rounded-xl w-full flex items-center gap-1 bg-gray-100 col-span-2">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-sm font-semibold placeholder:text-zinc-600 text-zinc-700"
              required
            />
            <Mail color="#12121261" size={20} />
          </div>
          <div className="p-3 border border-[#12121214] rounded-xl w-full flex items-center gap-1 bg-gray-100 col-span-2">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full outline-none bg-transparent text-sm font-semibold placeholder:text-zinc-600 text-zinc-700"
              required
            />
            <LockKeyhole color="#12121261" size={20} />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500/90 font-bold text-gray-100 p-3 rounded-[8px] hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <div className="text-center text-sm text-gray-500 mt-4 space-y-2">
          <p>
            Don{"'"}t have an account?{" "}
            <span
              onClick={() => navigate("/auth/register")}
              className="text-blue-500 hover:underline text-sm font-semibold cursor-pointer"
            >
              Create free account
            </span>
          </p>
          <p>
            <span
              onClick={() => navigate("/auth/forgot-password")}
              className="text-blue-500 hover:underline text-sm font-semibold cursor-pointer"
            >
              Forgot your password?
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
