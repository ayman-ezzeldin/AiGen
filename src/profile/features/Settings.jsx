import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDown } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "Profile", path: "profile" },
    { label: "Account", path: "account" },
    { label: "Appearance", path: "appearance" },
    { label: "Notifications", path: "notifications" },
  ];

  const currentPath = location.pathname.split("/").pop();

  const selectedTab = tabs.find((tab) => tab.path === currentPath) || tabs[0];

  const handleSelectChange = (tab) => {
    navigate(tab.path);
  };

  return (
    <div className="pl-6 md:pl-36 pt-14 pr-6 md:pr-16 pb-14 bg-[#f2f2f2] min-h-screen">
      <h2 className="font-bold text-2xl md:text-4xl">Settings</h2>
      <p className="pt-2 max-md:text-sm ">Manage your account settings</p>

      {/* Tabs for medium and large screens */}
      <ul className="hidden md:flex pt-8 items-center gap-x-12 font-semibold text-lg border-b-2 border-[#CCCCCC]">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `p-2 ${isActive ? "border-b-2 border-black -mb-px" : ""}`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </ul>

      {/* Dropdown for small screens */}
      <div className="block md:hidden mt-6">
        <Listbox value={selectedTab} onChange={handleSelectChange}>
          {({ open }) => (
            <div className="relative">
              <ListboxButton className="flex justify-between w-full border border-gray-300 rounded p-2 bg-white font-semibold cursor-pointer text-left outline-none">
                <span>{selectedTab.label}</span>
                <ChevronDown
                  className={`transition-transform duration-200 ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                />
              </ListboxButton>

              <ListboxOptions className="absolute mt-1 w-full bg-white border border-gray-200 rounded shadow-md z-50 outline-none">
                {tabs.map((tab) => (
                  <ListboxOption
                    key={tab.path}
                    value={tab}
                    className={({ active, selected }) =>
                      `flex items-center px-4 py-2 text-sm cursor-pointer ${
                        active ? "bg-blue-100" : ""
                      } ${selected ? "font-semibold" : ""}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        {selected && (
                          <CheckIcon className="w-4 h-4 mr-2 text-blue-600" />
                        )}
                        {tab.label}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          )}
        </Listbox>
      </div>

      <div className="mt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
