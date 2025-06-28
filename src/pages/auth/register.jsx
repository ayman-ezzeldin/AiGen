import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, UserRoundCheck } from "lucide-react";

const AuthRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, verificationError } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      console.error("كلمة السر غير متطابقة!");
      return;
    }

    try {
      const result = await dispatch(
        registerUser({
          username: formData.username,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          password2: formData.confirmPassword,
        })
      ).unwrap(); // unwrap() throws error if thunk fails

      if (result) {
        navigate("/auth/verify");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-2xl shadow-lg md:w-[636px] max-w-lg bg-white">
        <div className="flex flex-col items-center justify-center gap-2 ">
          <h2 className="text-3xl font-bold text-center text-zinc-800 ">
            Join AINO Today
          </h2>
          <p className="text-sm text-center text-[#52525B]">
            Create an account and start bringing your models to life.
          </p>
        </div>
        {isAuthenticated && (
          <p className="text-green-500 text-center mb-4">
            Logged in successfully
          </p>
        )}
        {verificationError && (
          <p className="text-red-500 text-center mb-4">{verificationError}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 my-8">
          <div className="p-3 border border-[#12121214] rounded-xl w-full flex items-center gap-1 bg-gray-100 col-span-2">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full outline-none bg-transparent text-sm font-semibold placeholder:text-zinc-600 text-zinc-700"
              required
            />
            <UserRoundCheck color="#12121261" size={20} />
          </div>
          <div className="p-3 border border-[#12121214] rounded-xl w-full flex items-center gap-1 bg-gray-100 col-span-2">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full outline-none bg-transparent text-sm font-semibold placeholder:text-zinc-600 text-zinc-700"
              required
            />
            <UserRoundCheck color="#12121261" size={20} />
          </div>
          <div className="p-3 border border-[#12121214] rounded-xl w-full flex items-center gap-1 bg-gray-100 col-span-2">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full outline-none bg-transparent text-sm font-semibold placeholder:text-zinc-600 text-zinc-700"
              required
            />
            <UserRoundCheck color="#12121261" size={20} />
          </div>
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
          <div className="p-3 border border-[#12121214] rounded-xl w-full flex items-center gap-1 bg-gray-100 col-span-2">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full outline-none bg-transparent text-sm font-semibold placeholder:text-zinc-600 text-zinc-700"
              required
            />
            <LockKeyhole color="#12121261" size={20} />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              value="true"
              className="w-4 h-4 border border-blue-500 rounded text-blue-600 focus:ring-blue-500"
            />
            <span>
              I agree to the{" "}
              <span className=" text-blue-500">terms and conditions</span> of
              Clarity
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500/90 font-bold text-gray-100 p-3 rounded-[8px] hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/auth/login")}
            className="text-blue-500 hover:underline text-sm font-semibold cursor-pointer"
          >
            Login
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default AuthRegister;
