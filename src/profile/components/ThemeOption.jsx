const ThemeOption = ({
  option,
  themeimage,
  isSelected,
  onSelect,
  children,
}) => {
  return (
    <figure
      onClick={onSelect}
      className={`px-3 py-5 md:px-6 md:py-8 rounded-lg flex flex-col items-center gap-y-8 max-w-72 cursor-pointer transition-all duration-200
        border border-gray-300
        ${isSelected ? "ring-2 ring-blue-500" : ""}`}
    >
      <figcaption className="flex gap-x-2 items-center">
        {children}
        <h4 className="max-sm:text-sm font-semibold">{option}</h4>
      </figcaption>
      <img
        src={themeimage}
        alt={`${option} preview`}
        className="w-56 rounded-md border border-gray-300"
      />
    </figure>
  );
};

export default ThemeOption;
