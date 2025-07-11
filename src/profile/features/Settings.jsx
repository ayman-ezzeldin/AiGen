import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDown } from "lucide-react";
import { Toaster } from "../components/ui/sonner"

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
    <div className="min-h-screen bg-[#f2f2f2] pt-14 pr-6 pb-14 pl-6 md:pr-16 md:pl-36">
      <h2 className="text-2xl font-bold md:text-4xl">Settings</h2>
      <p className="pt-2 max-md:text-sm">Manage your account settings</p>
      <Toaster />

      {/* Tabs for medium and large screens */}
      <ul className="hidden items-center gap-x-12 border-b-2 border-[#CCCCCC] pt-8 text-lg font-semibold md:flex">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `p-2 ${isActive ? "-mb-px border-b-2 border-black" : ""}`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </ul>

      {/* Dropdown for small screens */}
      <div className="mt-6 block md:hidden">
        <Listbox value={selectedTab} onChange={handleSelectChange}>
          {({ open }) => (
            <div className="relative">
              <ListboxButton className="flex w-full cursor-pointer justify-between rounded border border-gray-300 bg-white p-2 text-left font-semibold outline-none">
                <span>{selectedTab.label}</span>
                <ChevronDown
                  className={`transition-transform duration-200 ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                />
              </ListboxButton>

              <ListboxOptions className="absolute z-50 mt-1 w-full rounded border border-gray-200 bg-white shadow-md outline-none">
                {tabs.map((tab) => (
                  <ListboxOption
                    key={tab.path}
                    value={tab}
                    className={({ active, selected }) =>
                      `flex cursor-pointer items-center px-4 py-2 text-sm ${
                        active ? "bg-blue-100" : ""
                      } ${selected ? "font-semibold" : ""}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        {selected && (
                          <CheckIcon className="mr-2 h-4 w-4 text-blue-600" />
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