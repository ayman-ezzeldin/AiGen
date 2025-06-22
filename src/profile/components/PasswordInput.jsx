import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordInput = ({ id, value, onChange }) => {
  const [show, setShow] = useState(false);

  const toggleVisibility = () => setShow((prev) => !prev);

  return (
    <div className="p-2 border bg-white border-gray-200 rounded shadow-[0_4px_15px_rgba(18, 18, 18, 0.08)] w-full flex items-center gap-2 col-span-2">
      <input
        type={show ? "text" : "password"}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full outline-none"
        required
      />
      <button type="button" onClick={toggleVisibility}>
        {show ? (
          <Eye size={16} className="cursor-pointer" />
        ) : (
          <EyeOff size={16} className="cursor-pointer" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
