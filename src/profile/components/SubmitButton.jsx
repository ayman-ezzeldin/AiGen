const SubmitButton = ({ handleSubmit, children }) => {
  return (
    <div className="flex justify-end my-4 col-span-3">
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 transition text-white px-4 py-2 rounded w-fit cursor-pointer"
      >
        {children}
      </button>
    </div>
  );
};

export default SubmitButton;
