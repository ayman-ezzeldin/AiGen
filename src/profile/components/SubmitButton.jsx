import { Loader2 } from "lucide-react";

const SubmitButton = ({ children, isLoading, disabled }) => {
  return (
    <div className="flex justify-end my-4 gap-3 col-span-3 items-center">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 transition text-white px-4 py-2 rounded w-fit cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400"
        disabled={disabled || isLoading}
      >
        {children}
      </button>
      {isLoading && <Loader2 className="animate-spin w-8 h-8 text-blue-600" />}
    </div>
  );
};

export default SubmitButton;