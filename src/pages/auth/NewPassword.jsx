import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/store/auth-slice";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

const NewPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    new_password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from location state if available
  const emailFromState = location.state?.email || "";

  const { resetPasswordMessage, resetPasswordError, isLoading } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.new_password || !formData.confirm_password)
      return;

    if (formData.new_password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const result = await dispatch(
        resetPassword({
          email: formData.email,
          new_password: formData.new_password,
          confirm_password: formData.confirm_password,
        })
      ).unwrap();

      if (result) {
        // Navigate to login page after successful password reset
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Reset password error:", error);
    }
  };

  // Pre-fill email if coming from OTP verification page
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
            Set New Password
          </h2>
          <p className="text-sm text-center text-[#52525B]">
            Enter your new password to complete the reset process.
          </p>
        </div>

        {resetPasswordMessage && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            {resetPasswordMessage}
          </div>
        )}

        {resetPasswordError && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
            {resetPasswordError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 my-8">
          <div className="p-3 border border-[#12121214] rounded-xl w-full flex items-center gap-1 bg-gray-100">
            <input
              type={showPassword ? "text" : "password"}
              name="new_password"
              placeholder="Enter new password"
              value={formData.new_password}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-sm font-semibold placeholder:text-zinc-600 text-zinc-700"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1"
            >
              {showPassword ? (
                <EyeOff color="#12121261" size={20} />
              ) : (
                <Eye color="#12121261" size={20} />
              )}
            </button>
          </div>

          <div className="p-3 border border-[#12121214] rounded-xl w-full flex items-center gap-1 bg-gray-100">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              placeholder="Confirm new password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-sm font-semibold placeholder:text-zinc-600 text-zinc-700"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="p-1"
            >
              {showConfirmPassword ? (
                <EyeOff color="#12121261" size={20} />
              ) : (
                <Eye color="#12121261" size={20} />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={
              isLoading || !formData.new_password || !formData.confirm_password
            }
            className="w-full bg-blue-500/90 font-bold text-gray-100 p-3 rounded-[8px] hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate("/auth/VerifyPasswordOtp")}
            className="flex items-center gap-2 text-blue-500 hover:underline text-sm font-semibold mx-auto"
          >
            <ArrowLeft size={16} />
            Back to OTP Verification
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
