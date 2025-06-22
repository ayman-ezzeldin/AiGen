import { User } from "lucide-react";

const Input = ({ id, value, onChange, icon: Icon = User, type = "text" }) => {
  return (
    <div className="p-3 border border-[#12121214] rounded w-full flex items-center gap-1 bg-white col-span-2">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full outline-none text-sm text-[#12121261]"
      />
      <Icon color="#12121261" size={16} />
    </div>
  );
};

export default Input;
