const Label = ({ id, label }) => {
  return (
    <label
      htmlFor={id}
      className=" text-[#1A1A1A] cursor-pointer grid-cols-1 font-medium"
    >
      {label}
    </label>
  );
};

export default Label;
