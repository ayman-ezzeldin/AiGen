import { Switch } from "@headlessui/react";

const ToggleSwitch = ({ label, description, value, onChange }) => {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
      <div>
        <h4 className="text-gray-800t text-sm md:text-lg font-semibold leading-9">
          {label}
        </h4>
        <p className="text-xs md:text-sm text-gray-500">{description}</p>
      </div>

      <Switch
        checked={value}
        onChange={onChange}
        className={`${
          value ? "bg-blue-600" : "bg-gray-300"
        } relative inline-flex h-4 w-7 md:h-6 md:w-11 items-center rounded-full transition-colors cursor-pointer`}
      >
        <span
          className={`${
            value
              ? "translate-x-4 md:translate-x-6"
              : "translate-x-0.5 md:translate-x-1"
          } inline-block h-3 w-3 md:h-4 md:w-4 transform bg-white rounded-full transition-transform`}
        />
      </Switch>
    </div>
  );
};

export default ToggleSwitch;
