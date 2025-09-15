import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forgotPasswordMessage, forgotPasswordError, isLoading } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const result = await dispatch(forgotPassword(email)).unwrap();
      if (result) {
        // Navigate to OTP verification page with email
        navigate("/auth/VerifyPasswordOtp", {
          state: { email: email },
        });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-2xl shadow-lg md:w-[636px] max-w-lg bg-white">
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="text-3xl font-bold text-center text-zinc-800">
            Forgot Password?
          </h2>
          <p className="text-sm text-center text-[#52525B]">
            Enter your email address and we&apos;ll send you an OTP to reset
            your password.
          </p>
        </div>

        {forgotPasswordMessage && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            {forgotPasswordMessage}
          </div>
        )}

        {forgotPasswordError && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
            {forgotPasswordError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 my-8">
          <div className="p-3 border border-[#12121214] rounded-xl w-full flex items-center gap-1 bg-gray-100">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none bg-transparent text-sm font-semibold placeholder:text-zinc-600 text-zinc-700"
              required
            />
            <Mail color="#12121261" size={20} />
          </div>

          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full bg-blue-500/90 font-bold text-gray-100 p-3 rounded-[8px] hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate("/auth/login")}
            className="flex items-center gap-2 text-blue-500 hover:underline text-sm font-semibold mx-auto"
          >
            <ArrowLeft size={16} />
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
