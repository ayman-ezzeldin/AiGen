import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestOtp, verifyMail } from '@/store/auth-slice';
import { useNavigate } from 'react-router-dom';
import { SendHorizontal } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";


const VerifyMailPage = () => {
  const [otpMessage, setOtpMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isVerified, verificationError } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const handleChange = (e) => {
    setOtpMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otpMessage.trim() === '') return;

    try {
      await dispatch(verifyMail({ otp: otpMessage })).unwrap();
      navigate('/user/home');
    } catch (error) {
      console.error('Verification error:', error);
    }
  };

  const handleResendOtp = async () => {
    try {
      await dispatch(requestOtp()).unwrap();
      toast({
        title: "OTP Resent",
        description: "A new OTP has been sent to your email.",
      });
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      toast({
        title: "Error",
        description: "Failed to resend OTP.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-2xl shadow-lg md:w-[636px] max-w-lg bg-white">
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="text-3xl font-bold text-center text-zinc-800">
            Welcome Back!
          </h2>
          <p className="text-sm text-center text-[#52525B]">
            Check your email for the verification code.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="p-4 border border-[#12121214] rounded-xl w-full flex items-center gap-1 bg-gray-100 col-span-2">
            <input
              type="text"
              name="otpMessage"
              value={otpMessage}
              onChange={handleChange}
              placeholder="Your OTP"
              className="w-full outline-none bg-transparent text-sm font-semibold placeholder:text-zinc-600 text-zinc-700"
              required
            />
            <SendHorizontal color="#12121261" size={20} />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500/90 font-bold text-gray-100 p-3 rounded-[8px] hover:bg-blue-600 transition duration-300"
          >
            Verify OTP
          </button>
        </form>

        {/* ✅ رسائل بعد التحقق */}
        {isVerified && (
          <p className="text-green-500 text-center mt-4">Email verified successfully!</p>
        )}

        {verificationError && (
          <p className="text-red-500 text-center mt-4">{verificationError}</p>
        )}

        {/* ✅ زر إعادة الإرسال */}
        <div className="text-center mt-4">
          <button
            onClick={handleResendOtp}
            className="text-blue-500/90 underline font-medium text-sm"
          >
            Request a new OTP
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default VerifyMailPage;
