import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyPasswordOtp } from "@/store/auth-slice";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";

const VerifyPasswordOtp = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from location state if available
  const emailFromState = location.state?.email || "";

  const { verifyOtpMessage, verifyOtpError, isLoading } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.otp) return;

    try {
      const result = await dispatch(
        verifyPasswordOtp({
          email: formData.email,
          otp: formData.otp,
        })
      ).unwrap();

      if (result) {
        // Navigate to new password page with email
        navigate("/auth/NewPassword", {
          state: { email: formData.email },
        });
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
    }
  };

  // Pre-fill email if coming from forgot password page
  useEffect(() => {
    if (emailFromState) {
      setFormData((prev) => ({ ...prev, email: emailFromState }));
    }
  }, [emailFromState]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-2xl shadow-lg md:w-[636px] max-w-lg bg-white">
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="text-3xl font-bold text-center text-zinc-800">
            Verify OTP
          </h2>
          <p className="text-sm text-center text-[#52525B]">
            Enter the OTP sent to your email address to continue.
          </p>
        </div>

        {verifyOtpMessage && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            {verifyOtpMessage}
          </div>
        )}

        {verifyOtpError && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
            {verifyOtpError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 my-8">
          <div className="p-3 border border-[#12121214] rounded-xl w-full flex items-center gap-1 bg-gray-100">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-sm font-semibold placeholder:text-zinc-600 text-zinc-700"
              required
              maxLength={6}
            />
            <Shield color="#12121261" size={20} />
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.otp}
            className="w-full bg-blue-500/90 font-bold text-gray-100 p-3 rounded-[8px] hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate("/auth/forget-password")}
            className="flex items-center gap-2 text-blue-500 hover:underline text-sm font-semibold mx-auto"
          >
            <ArrowLeft size={16} />
            Back to Forgot Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPasswordOtp;
